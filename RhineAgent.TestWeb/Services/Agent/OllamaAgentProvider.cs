using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;

namespace RhineAgent.TestWeb.Services.Agent
{
    public class OllamaAgentProvider : IAgentProvider
    {
        private readonly HttpClient _httpClient;
        private readonly IOptionsMonitor<AgentSettings> _settingsMonitor;
        private readonly ILogger<OllamaAgentProvider> _logger;

        public OllamaAgentProvider(
            HttpClient httpClient,
            IOptionsMonitor<AgentSettings> settingsMonitor,
            ILogger<OllamaAgentProvider> logger)
        {
            _httpClient = httpClient;
            _settingsMonitor = settingsMonitor;
            _logger = logger;
        }

        public string ProviderName => "Ollama";
        public bool IsDemo => true;

        public async Task<AgentChatResponse> AskAsync(AgentChatRequest request, CancellationToken cancellationToken = default)
        {
            var settings = _settingsMonitor.CurrentValue;
            var ollamaConfig = settings.Ollama ?? new OllamaConfig();
            var baseUrl = (ollamaConfig.BaseUrl ?? "http://localhost:11434").TrimEnd('/');
            var model = string.IsNullOrWhiteSpace(ollamaConfig.Model) ? "llama3.2" : ollamaConfig.Model;

            var messages = new List<OllamaChatMessage>();

            // System prompt
            if (!string.IsNullOrWhiteSpace(ollamaConfig.SystemPrompt))
            {
                messages.Add(new OllamaChatMessage
                {
                    Role = "system",
                    Content = ollamaConfig.SystemPrompt
                });
            }

            // Include history if provided (limit to last 10 messages for speed and context limits)
            if (request.History != null && request.History.Count > 0)
            {
                var recentHistory = request.History.TakeLast(10);
                foreach (var h in recentHistory)
                {
                    if (!string.IsNullOrWhiteSpace(h.Content))
                    {
                        messages.Add(new OllamaChatMessage
                        {
                            Role = string.Equals(h.Role, "assistant", StringComparison.OrdinalIgnoreCase) ? "assistant" : "user",
                            Content = h.Content
                        });
                    }
                }
            }

            // Add latest user message
            messages.Add(new OllamaChatMessage
            {
                Role = "user",
                Content = request.Message
            });

            var payload = new OllamaChatPayload
            {
                Model = model,
                Messages = messages,
                Stream = false
            };

            using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(Math.Max(5, ollamaConfig.TimeoutSeconds)));
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeoutCts.Token);

            try
            {
                var targetUrl = $"{baseUrl}/api/chat";
                _logger.LogInformation("Sending chat request to Ollama provider at {Url} with model {Model}", targetUrl, model);

                var response = await _httpClient.PostAsJsonAsync(targetUrl, payload, linkedCts.Token);

                if (!response.IsSuccessStatusCode)
                {
                    var errorBody = await response.Content.ReadAsStringAsync(linkedCts.Token);
                    _logger.LogWarning("Ollama responded with status {StatusCode}: {ErrorBody}", response.StatusCode, errorBody);

                    return new AgentChatResponse
                    {
                        Success = false,
                        ProviderName = ProviderName,
                        IsDemo = IsDemo,
                        ConversationId = request.ConversationId,
                        ErrorMessage = $"Ollama returned HTTP {(int)response.StatusCode} ({response.ReasonPhrase}). Please check if model '{model}' is installed."
                    };
                }

                var result = await response.Content.ReadFromJsonAsync<OllamaChatResult>(cancellationToken: linkedCts.Token);

                if (result?.Message != null && !string.IsNullOrWhiteSpace(result.Message.Content))
                {
                    return new AgentChatResponse
                    {
                        Success = true,
                        Message = result.Message.Content.Trim(),
                        ProviderName = ProviderName,
                        IsDemo = IsDemo,
                        ConversationId = request.ConversationId ?? Guid.NewGuid().ToString("N")
                    };
                }

                return new AgentChatResponse
                {
                    Success = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    ConversationId = request.ConversationId,
                    ErrorMessage = "Ollama returned an empty response. Please verify the model configuration."
                };
            }
            catch (TaskCanceledException ex) when (timeoutCts.IsCancellationRequested)
            {
                _logger.LogWarning(ex, "Timeout connecting to Ollama at {BaseUrl}", baseUrl);
                return new AgentChatResponse
                {
                    Success = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    ConversationId = request.ConversationId,
                    ErrorMessage = $"Request timed out waiting for Ollama ({ollamaConfig.TimeoutSeconds}s). Please verify the server has sufficient capacity."
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(ex, "Failed to connect to Ollama at {BaseUrl}", baseUrl);
                return new AgentChatResponse
                {
                    Success = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    ConversationId = request.ConversationId,
                    ErrorMessage = $"Unable to connect to Ollama at {baseUrl}. Ensure Ollama is running (`ollama serve`) and model '{model}' is available."
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error communicating with Ollama");
                return new AgentChatResponse
                {
                    Success = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    ConversationId = request.ConversationId,
                    ErrorMessage = $"An error occurred while contacting AI service: {ex.Message}"
                };
            }
        }

        public async Task<AgentProviderStatus> GetStatusAsync(CancellationToken cancellationToken = default)
        {
            var settings = _settingsMonitor.CurrentValue;
            var ollamaConfig = settings.Ollama ?? new OllamaConfig();
            var baseUrl = (ollamaConfig.BaseUrl ?? "http://localhost:11434").TrimEnd('/');
            var model = string.IsNullOrWhiteSpace(ollamaConfig.Model) ? "llama3.2" : ollamaConfig.Model;

            if (!settings.Enabled)
            {
                return new AgentProviderStatus
                {
                    Enabled = false,
                    IsAvailable = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    Model = model,
                    Details = "AI agent provider is disabled in server configuration."
                };
            }

            try
            {
                using var shortTimeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(3));
                using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, shortTimeoutCts.Token);

                var response = await _httpClient.GetAsync($"{baseUrl}/api/tags", linkedCts.Token);
                if (response.IsSuccessStatusCode)
                {
                    var tags = await response.Content.ReadFromJsonAsync<OllamaTagsResult>(cancellationToken: linkedCts.Token);
                    var modelExists = tags?.Models?.Any(m => m.Name != null && m.Name.StartsWith(model, StringComparison.OrdinalIgnoreCase)) ?? false;

                    return new AgentProviderStatus
                    {
                        Enabled = true,
                        IsAvailable = true,
                        ProviderName = ProviderName,
                        IsDemo = IsDemo,
                        Model = model,
                        Details = modelExists 
                            ? $"Connected to Ollama ({model} ready)." 
                            : $"Connected to Ollama, but model '{model}' was not found in local library."
                    };
                }

                return new AgentProviderStatus
                {
                    Enabled = true,
                    IsAvailable = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    Model = model,
                    Details = $"Ollama responded with HTTP {response.StatusCode}."
                };
            }
            catch
            {
                return new AgentProviderStatus
                {
                    Enabled = true,
                    IsAvailable = false,
                    ProviderName = ProviderName,
                    IsDemo = IsDemo,
                    Model = model,
                    Details = $"Ollama offline at {baseUrl}."
                };
            }
        }

        private class OllamaChatPayload
        {
            [JsonPropertyName("model")]
            public string Model { get; set; } = string.Empty;

            [JsonPropertyName("messages")]
            public List<OllamaChatMessage> Messages { get; set; } = new();

            [JsonPropertyName("stream")]
            public bool Stream { get; set; } = false;
        }

        private class OllamaChatMessage
        {
            [JsonPropertyName("role")]
            public string Role { get; set; } = "user";

            [JsonPropertyName("content")]
            public string Content { get; set; } = string.Empty;
        }

        private class OllamaChatResult
        {
            [JsonPropertyName("message")]
            public OllamaChatMessage? Message { get; set; }

            [JsonPropertyName("done")]
            public bool Done { get; set; }
        }

        private class OllamaTagsResult
        {
            [JsonPropertyName("models")]
            public List<OllamaModelItem>? Models { get; set; }
        }

        private class OllamaModelItem
        {
            [JsonPropertyName("name")]
            public string? Name { get; set; }
        }
    }
}

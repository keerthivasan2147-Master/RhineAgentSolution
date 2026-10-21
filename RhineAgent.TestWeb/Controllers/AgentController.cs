using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RhineAgent.TestWeb.Services.Agent;
using System.Net;

namespace RhineAgent.TestWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentController : ControllerBase
    {
        private readonly IAgentProvider _agentProvider;
        private readonly IOptionsMonitor<AgentSettings> _settingsMonitor;
        private readonly IAntiforgery _antiforgery;
        private readonly ILogger<AgentController> _logger;

        public AgentController(
            IAgentProvider agentProvider,
            IOptionsMonitor<AgentSettings> settingsMonitor,
            IAntiforgery antiforgery,
            ILogger<AgentController> logger)
        {
            _agentProvider = agentProvider;
            _settingsMonitor = settingsMonitor;
            _antiforgery = antiforgery;
            _logger = logger;
        }

        /// <summary>
        /// Sends user message to the active server-side AI agent provider.
        /// </summary>
        [HttpPost("chat")]
        [Produces("application/json")]
        public async Task<IActionResult> Chat([FromBody] AgentChatRequest request, CancellationToken cancellationToken)
        {
            var settings = _settingsMonitor.CurrentValue;

            // Security: Client settings cannot bypass server-side agent-enabled setting
            if (!settings.Enabled)
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, new AgentChatResponse
                {
                    Success = false,
                    ProviderName = _agentProvider.ProviderName,
                    IsDemo = _agentProvider.IsDemo,
                    ErrorMessage = "The AI Assistant service is currently disabled on the server."
                });
            }

            // Optional anti-forgery verification if header is supplied
            if (Request.Headers.ContainsKey("RequestVerificationToken"))
            {
                try
                {
                    await _antiforgery.ValidateRequestAsync(HttpContext);
                }
                catch (AntiforgeryValidationException ex)
                {
                    _logger.LogWarning(ex, "Anti-forgery token validation failed for agent chat request.");
                    return StatusCode((int)HttpStatusCode.Forbidden, new AgentChatResponse
                    {
                        Success = false,
                        ErrorMessage = "Invalid anti-forgery token. Please refresh the page and try again."
                    });
                }
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = errors
                });
            }

            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = "Message cannot be empty."
                });
            }

            // Server-side max length validation
            if (request.Message.Length > settings.MaxInputLength)
            {
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = $"Message exceeds the maximum allowed length of {settings.MaxInputLength} characters."
                });
            }

            // Sanitize raw message to avoid null characters or control anomalies
            request.Message = request.Message.Trim();

            var response = await _agentProvider.AskAsync(request, cancellationToken);
            return Ok(response);
        }

        /// <summary>
        /// Returns the current agent provider status, model info, and demo notice.
        /// </summary>
        [HttpGet("status")]
        [Produces("application/json")]
        public async Task<IActionResult> GetStatus(CancellationToken cancellationToken)
        {
            var status = await _agentProvider.GetStatusAsync(cancellationToken);
            return Ok(status);
        }

        /// <summary>
        /// Provides an anti-forgery token for client widgets.
        /// </summary>
        [HttpGet("antiforgery-token")]
        [Produces("application/json")]
        public IActionResult GetAntiforgeryToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            return Ok(new
            {
                token = tokens.RequestToken,
                headerName = tokens.HeaderName ?? "RequestVerificationToken"
            });
        }

        /// <summary>
        /// Provides high-quality Arabic and multilingual audio speech stream
        /// </summary>
        [HttpGet("tts")]
        [ResponseCache(Duration = 86400, Location = ResponseCacheLocation.Client)]
        public async Task<IActionResult> GetTts([FromQuery] string text, [FromQuery] string lang = "ar", CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest();
            }

            try
            {
                var clean = text.Trim();
                if (clean.Length > 200) clean = clean.Substring(0, 200);

                var url = $"https://translate.google.com/translate_tts?ie=UTF-8&q={Uri.EscapeDataString(clean)}&tl={Uri.EscapeDataString(lang)}&client=tw-ob";
                using var client = new HttpClient();
                client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

                var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
                if (response.IsSuccessStatusCode)
                {
                    var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
                    return File(stream, "audio/mpeg");
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to stream TTS audio for text: {Text}", text);
            }

            return NotFound();
        }

        /// <summary>
        /// Submits a meeting request from the AI Business Advisor.
        /// Destination: info@rhineme.com
        /// </summary>
        [HttpPost("meeting-request")]
        [Produces("application/json")]
        public async Task<IActionResult> SubmitMeetingRequest([FromBody] MeetingRequestDto request, CancellationToken cancellationToken)
        {
            if (Request.Headers.ContainsKey("RequestVerificationToken"))
            {
                try
                {
                    await _antiforgery.ValidateRequestAsync(HttpContext);
                }
                catch (AntiforgeryValidationException ex)
                {
                    _logger.LogWarning(ex, "Anti-forgery token validation failed for meeting request.");
                    return StatusCode((int)HttpStatusCode.Forbidden, new MeetingRequestResponse
                    {
                        Success = false,
                        ErrorMessage = "Invalid anti-forgery token. Please refresh the page and try again."
                    });
                }
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = errors
                });
            }

            // Server-side validations
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.CompanyName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Telephone) ||
                string.IsNullOrWhiteSpace(request.MeetingTopic) ||
                string.IsNullOrWhiteSpace(request.PreferredDateTime))
            {
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = "All required fields must be provided."
                });
            }

            // Require country code in phone
            var phoneTrim = request.Telephone.Trim();
            var hasCountryCode = phoneTrim.StartsWith("+") || phoneTrim.StartsWith("00") || (phoneTrim.Length >= 10 && phoneTrim.Any(char.IsDigit));
            if (!hasCountryCode)
            {
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = "Please include your country code with your telephone number."
                });
            }

            var websiteDisplay = string.IsNullOrWhiteSpace(request.Website) || request.Website.Trim().Equals("No Website", StringComparison.OrdinalIgnoreCase)
                ? "No Website"
                : request.Website.Trim();

            var subject = $"RHINE Website — New Meeting Request — {request.FullName.Trim()} — {request.CompanyName.Trim()}";
            var body = $@"A new meeting request has been submitted through the RHINE AI Business Advisor.

Full Name: {request.FullName.Trim()}
Company: {request.CompanyName.Trim()}
Website: {websiteDisplay}
Email: {request.Email.Trim()}
Telephone: {request.Telephone.Trim()}
Preferred Date and Time: {request.PreferredDateTime.Trim()}

Meeting Request:
{request.MeetingTopic.Trim()}

The visitor reviewed and confirmed the above information before submission.";

            _logger.LogInformation("New Meeting Request Submitted to info@rhineme.com:\nSubject: {Subject}\nBody:\n{Body}", subject, body);

            try
            {
                // Attempt SMTP dispatch if configured
                var config = HttpContext.RequestServices.GetService<IConfiguration>();
                var smtpHost = config?["Smtp:Host"];
                if (!string.IsNullOrWhiteSpace(smtpHost) && config != null)
                {
                    using var smtpClient = new System.Net.Mail.SmtpClient(smtpHost);
                    var portStr = config["Smtp:Port"];
                    if (int.TryParse(portStr, out var port)) smtpClient.Port = port;
                    var user = config["Smtp:Username"];
                    var pass = config["Smtp:Password"];
                    if (!string.IsNullOrWhiteSpace(user))
                    {
                        smtpClient.Credentials = new System.Net.NetworkCredential(user, pass);
                        smtpClient.EnableSsl = bool.TryParse(config["Smtp:EnableSsl"], out var ssl) && ssl;
                    }
                    var from = config["Smtp:From"] ?? "noreply@rhineme.com";
                    using var mailMessage = new System.Net.Mail.MailMessage(from, "info@rhineme.com", subject, body);
                    await smtpClient.SendMailAsync(mailMessage, cancellationToken);
                }

                return Ok(new MeetingRequestResponse
                {
                    Success = true,
                    Message = "Meeting request submitted successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send meeting request notification email.");
                return StatusCode((int)HttpStatusCode.InternalServerError, new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = "I could not send your meeting request at this time. Please try again or contact info@rhineme.com directly."
                });
            }
        }
    }
}

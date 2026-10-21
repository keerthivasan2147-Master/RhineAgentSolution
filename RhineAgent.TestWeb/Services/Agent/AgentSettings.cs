namespace RhineAgent.TestWeb.Services.Agent
{
    public class AgentSettings
    {
        public bool Enabled { get; set; } = true;
        public string Provider { get; set; } = "Ollama";
        public int MaxInputLength { get; set; } = 1000;
        public OllamaConfig Ollama { get; set; } = new();
    }

    public class OllamaConfig
    {
        public string BaseUrl { get; set; } = "http://localhost:11434";
        public string Model { get; set; } = "llama3.2";
        public int TimeoutSeconds { get; set; } = 45;
        public string SystemPrompt { get; set; } = "You are a professional, polite, and helpful female AI avatar assistant representing Rhine. Keep answers clear, accurate, and concise for spoken presentation.";
    }
}

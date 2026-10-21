namespace RhineAgent.TestWeb.Services.Agent
{
    public class AgentProviderStatus
    {
        public bool Enabled { get; set; } = true;
        public bool IsAvailable { get; set; } = false;
        public string ProviderName { get; set; } = string.Empty;
        public bool IsDemo { get; set; } = false;
        public string? Model { get; set; }
        public string? Details { get; set; }
    }
}

namespace RhineAgent.TestWeb.Services.Agent
{
    public class AgentChatResponse
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; } = string.Empty;
        public string? ConversationId { get; set; }
        public string ProviderName { get; set; } = string.Empty;
        public bool IsDemo { get; set; } = false;
        public string? ErrorMessage { get; set; }
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }
}

using System.ComponentModel.DataAnnotations;

namespace RhineAgent.TestWeb.Services.Agent
{
    public class AgentChatRequest
    {
        [Required(ErrorMessage = "Message content is required.")]
        [StringLength(1000, ErrorMessage = "Message cannot exceed 1000 characters.")]
        public string Message { get; set; } = string.Empty;

        public string? ConversationId { get; set; }

        public string? Language { get; set; } = "en-US";

        public List<AgentChatMessage>? History { get; set; } = new();
    }

    public class AgentChatMessage
    {
        public string Role { get; set; } = "user"; // "user", "assistant", or "system"
        public string Content { get; set; } = string.Empty;
    }
}

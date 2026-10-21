namespace RhineAgent.TestWeb.Services.Agent
{
    public interface IAgentProvider
    {
        string ProviderName { get; }
        bool IsDemo { get; }
        Task<AgentChatResponse> AskAsync(AgentChatRequest request, CancellationToken cancellationToken = default);
        Task<AgentProviderStatus> GetStatusAsync(CancellationToken cancellationToken = default);
    }
}

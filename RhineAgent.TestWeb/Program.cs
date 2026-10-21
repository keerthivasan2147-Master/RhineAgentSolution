using RhineAgent.TestWeb.Services.Agent;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configure Agent settings and services
builder.Services.Configure<AgentSettings>(builder.Configuration.GetSection("AgentSettings"));

// Register IAgentProvider. Currently configured to OllamaAgentProvider.
// When switching to another agent API (e.g. BossAgentProvider), swap registration here.
builder.Services.AddHttpClient<IAgentProvider, OllamaAgentProvider>(client =>
{
    var ollamaConfig = builder.Configuration.GetSection("AgentSettings:Ollama").Get<OllamaConfig>() ?? new OllamaConfig();
    client.BaseAddress = new Uri(ollamaConfig.BaseUrl ?? "http://localhost:11434");
    client.Timeout = TimeSpan.FromSeconds(Math.Max(5000, ollamaConfig.TimeoutSeconds));
});

// Configure Anti-Forgery
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
});

// Configure narrow CORS policy for widget if hosted separately
builder.Services.AddCors(options =>
{
    options.AddPolicy("WidgetCorsPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
        {
            if (string.IsNullOrEmpty(origin)) return false;
            var uri = new Uri(origin);
            return uri.IsLoopback; // Allow localhost origins narrowly for local dev/testing
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("WidgetCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

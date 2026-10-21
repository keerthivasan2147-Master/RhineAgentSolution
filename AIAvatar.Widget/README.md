# Rhine AI Floating Avatar Assistant Widget

An independent, professional floating AI avatar assistant widget designed for ASP.NET Core MVC and Razor Pages websites, with portrait video presenter playback, voice recognition, real-time speech synchronization, and dark glassmorphic styling.

---

## 📁 Directory Structure

```
AIAvatar.Widget/
├── avatar-widget.css       # Complete responsive styling (dark glassmorphism, mobile/tablet media queries)
├── avatar-widget.js        # Zero-dependency vanilla JS widget (speech, chat, events, security)
├── config.example.js       # Example configuration file
├── index.html              # Standalone demonstration & testing page
├── README.md               # Integration & deployment guide
└── assets/
    ├── presenter-poster.jpg # High-resolution portrait poster image
    └── presenter.mp4        # (Optional) Configurable female presenter video file
```

---

## 🚀 How to Embed Into Another ASP.NET MVC / Razor Website

### Step 1: Copy Widget Assets
Copy the contents of `AIAvatar.Widget/` into your application's `wwwroot/avatar-widget/` folder:
- `avatar-widget.css`
- `avatar-widget.js`
- `assets/presenter-poster.jpg`
- `assets/presenter.mp4` (when ready)

### Step 2: Add the Razor Partial
Create `Views/Shared/_AvatarWidgetPartial.cshtml`:

```html
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery
@{
    var requestToken = Antiforgery.GetAndStoreTokens(Context).RequestToken;
}

<link rel="stylesheet" href="~/avatar-widget/avatar-widget.css" asp-append-version="true" />
<script src="~/avatar-widget/avatar-widget.js" asp-append-version="true"></script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        if (window.RhineAvatarWidget) {
            window.rhineAvatar = new window.RhineAvatarWidget({
                endpoint: "/api/agent/chat",
                statusEndpoint: "/api/agent/status",
                videoSrc: "/avatar-widget/assets/presenter.mp4",
                posterSrc: "/avatar-widget/assets/presenter-poster.jpg",
                title: "Rhine AI Presenter",
                initialGreeting: "Hello! I am your AI avatar assistant. How can I assist you with Rhine today?",
                language: "en-US",
                antiForgeryHeader: "RequestVerificationToken",
                antiForgeryToken: "@requestToken",
                autoOpen: false
            });
        }
    });
</script>
```

### Step 3: Include in `_Layout.cshtml`
Inside your `Views/Shared/_Layout.cshtml`, include the partial right before `</body>`:

```html
    <partial name="_AvatarWidgetPartial" />
</body>
</html>
```

---

## 🎬 Adding Your Female Presenter Video

1. Place your MP4 video file at:
   - `AIAvatar.Widget/assets/presenter.mp4`
   - and `RhineAgent.TestWeb/wwwroot/avatar-widget/assets/presenter.mp4`
2. Place your high-res portrait poster image at:
   - `assets/presenter-poster.jpg` (a default studio portrait is already generated and included)
3. **Graceful Fallback**: If `presenter.mp4` is absent, the widget gracefully falls back to the high-resolution portrait poster image without breaking the layout or console errors.
4. **Synchronization**:
   - The video audio is kept permanently muted (`muted`).
   - The video automatically plays when the assistant's speech synthesizer is actively speaking.
   - The video automatically pauses when speech ends or when the assistant is idle.

---

## 🔄 Switching From Ollama to Boss's Agent API

The backend utilizes the `IAgentProvider` abstraction pattern. When changing providers, **no frontend or widget redesign is required**:

1. Implement `IAgentProvider` for your boss's API:
   ```csharp
   public class BossAgentProvider : IAgentProvider
   {
       public string ProviderName => "BossAgentAPI";
       public bool IsDemo => false;

       public async Task<AgentChatResponse> AskAsync(AgentChatRequest request, CancellationToken cancellationToken = default)
       {
           // Call boss's API endpoint here
       }

       public async Task<AgentProviderStatus> GetStatusAsync(CancellationToken cancellationToken = default)
       {
           // Check boss's API health here
       }
   }
   ```
2. In `Program.cs`, swap the registration:
   ```csharp
   // Replace OllamaAgentProvider with BossAgentProvider:
   builder.Services.AddHttpClient<IAgentProvider, BossAgentProvider>();
   ```
3. That is all! The widget will immediately receive responses from the new provider and automatically update its status indicator from Demo Mode to Production Mode.

---

## 🛡️ Security Features

- **No Exposed Credentials**: API keys and model parameters are kept strictly server-side in `appsettings.json` or environment variables.
- **Server-Side Enforcement**: `AgentSettings.Enabled` is enforced on the server. If disabled, all requests return HTTP 503; client-side parameters cannot bypass this.
- **Input Validation & Sanitization**: Messages are constrained to `MaxInputLength` (default 1000 characters) both client-side and server-side. DOM text node escaping prevents XSS injection.
- **Anti-Forgery Protection**: Sends `RequestVerificationToken` in headers for full CSRF compliance with ASP.NET Core.
- **Narrow CORS**: Cross-origin policy restricts external origins to approved domains or local loopback in development.

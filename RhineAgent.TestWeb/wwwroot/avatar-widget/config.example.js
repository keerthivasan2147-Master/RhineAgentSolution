/**
 * Example Configuration for Rhine AI Avatar Assistant Widget
 * Copy or adapt this configuration when embedding into your application.
 */

window.RhineAvatarConfig = {
  // Title displayed in header and launcher tooltip
  title: "Rhine AI Presenter",

  // Server-side chat endpoint (calls your ASP.NET backend controller, never Ollama directly)
  endpoint: "/api/agent/chat",

  // Server-side health/status check endpoint
  statusEndpoint: "/api/agent/status",

  // Video and poster asset paths
  videoSrc: "/avatar-widget/assets/presenter.mp4",
  posterSrc: "/avatar-widget/assets/presenter-poster.jpg",

  // Initial welcome message shown when widget opens
  initialGreeting: "Hello! I am your AI avatar assistant. How can I assist you with Rhine today?",

  // Default language for TTS speech and recognition ('en-US', 'es-ES', 'fr-FR', 'de-DE', 'zh-CN')
  language: "en-US",

  // Max characters allowed for input messages (matched with server-side validation)
  maxInputLength: 1000,

  // Automatically open on page load (false recommended for floating widget)
  autoOpen: false,

  // Voice speech synthesis enabled
  enableSpeech: true,

  // Header name for ASP.NET Anti-Forgery token
  antiForgeryHeader: "RequestVerificationToken",

  // Anti-forgery token string (can also be auto-detected from __RequestVerificationToken or meta tag)
  antiForgeryToken: null
};

// Initialize the widget when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  if (window.RhineAvatarWidget && window.RhineAvatarConfig) {
    window.avatarInstance = new window.RhineAvatarWidget(window.RhineAvatarConfig);
  }
});

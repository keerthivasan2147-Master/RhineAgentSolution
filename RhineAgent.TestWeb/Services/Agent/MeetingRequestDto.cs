using System.ComponentModel.DataAnnotations;

namespace RhineAgent.TestWeb.Services.Agent
{
    public class MeetingRequestDto
    {
        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(150, ErrorMessage = "Full name cannot exceed 150 characters.")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company name is required.")]
        [StringLength(150, ErrorMessage = "Company name cannot exceed 150 characters.")]
        public string CompanyName { get; set; } = string.Empty;

        [StringLength(250, ErrorMessage = "Website cannot exceed 250 characters.")]
        public string? Website { get; set; }

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Please provide a valid email address.")]
        [StringLength(150, ErrorMessage = "Email cannot exceed 150 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Telephone number is required.")]
        [StringLength(50, ErrorMessage = "Telephone number cannot exceed 50 characters.")]
        public string Telephone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Meeting request message is required.")]
        [StringLength(3000, ErrorMessage = "Meeting request message cannot exceed 3000 characters.")]
        public string MeetingTopic { get; set; } = string.Empty;

        [Required(ErrorMessage = "Preferred date and time is required.")]
        [StringLength(200, ErrorMessage = "Preferred date and time cannot exceed 200 characters.")]
        public string PreferredDateTime { get; set; } = string.Empty;
    }

    public class MeetingRequestResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? ErrorMessage { get; set; }
    }
}

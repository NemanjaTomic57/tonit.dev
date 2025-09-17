using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AppointmentDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Company { get; set; } = string.Empty;

    [Required]
    public DateTimeOffset AppointmentTime { get; set; }
    public string? Offset { get; set; }

    public string? Message { get; set; }
}

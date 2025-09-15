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
    public DateTimeOffset DateTime { get; set; }

    public string? Message { get; set; }
}

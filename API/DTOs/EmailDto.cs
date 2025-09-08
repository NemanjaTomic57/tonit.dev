using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class EmailDto
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;
}

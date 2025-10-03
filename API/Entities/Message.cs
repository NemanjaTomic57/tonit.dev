using System;

namespace API.Entities;

public class Message : BaseEntity
{
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public required string Content { get; set; }
}

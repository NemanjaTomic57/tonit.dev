namespace API.Entities;

public class Appointment : BaseEntity
{
    public required string Name { get; set; }
    public required string Company { get; set; }
    public required string Email { get; set; }
    public required DateTimeOffset AppointmentTime { get; set; }
    public string? Message { get; set; }
}

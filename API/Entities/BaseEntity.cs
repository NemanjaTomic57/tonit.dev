namespace API.Entities;

public class BaseEntity
{
    public int Id { get; set; }
    public required DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

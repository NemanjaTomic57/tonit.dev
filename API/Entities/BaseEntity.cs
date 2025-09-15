namespace API.Entities;

public class BaseEntity
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

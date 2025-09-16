namespace API.Entities;

public class BlogPost : BaseEntity
{
    public required DateTimeOffset PublicationDate { get; set; }
    public required string Author { get; set; }
    public required string Heading { get; set; }
    public required string ThumbnailSlug { get; set; }
    public required string Markdown { get; set; }
    public required string Slug { get; set; }
    public int Views { get; set; } = 0;
}

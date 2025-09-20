using API.Entities;

namespace API.Specifications;

public class BlogSpecification : BaseSpecification<BlogPost>
{
    public BlogSpecification(string? slug) : base(x =>
        string.IsNullOrWhiteSpace(slug) || x.Slug == slug
    )
    {
        AddOrderByDescending(x => x.PublicationDate);
    }
}

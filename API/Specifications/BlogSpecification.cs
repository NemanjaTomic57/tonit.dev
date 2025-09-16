using System;
using API.Entities;

namespace API.Specifications;

public class BlogSpecification : BaseSpecification<BlogPost>
{
    public BlogSpecification(string slug) : base(x =>
        x.Slug == slug
    )
    { 
    }
}

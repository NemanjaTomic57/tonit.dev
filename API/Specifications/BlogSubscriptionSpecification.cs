using System;
using API.Entities;

namespace API.Specifications;

public class BlogSubscriptionSpecification : BaseSpecification<BlogSubscription>
{
    public BlogSubscriptionSpecification(string email) : base(x =>
        x.Email == email
    )
    {
    }
}

using System;
using System.Linq.Expressions;

namespace API.Specifications;

public class BaseSpecification<T>(Expression<Func<T, bool>>? criteria)
{
    protected BaseSpecification() : this(null) { }

    public Expression<Func<T, bool>>? Criteria => criteria;
}

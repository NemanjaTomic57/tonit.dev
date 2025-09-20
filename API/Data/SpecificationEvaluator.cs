using API.Entities;
using API.Specifications;

namespace API.Data;

public class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> query, BaseSpecification<T> spec)
    {
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }

        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }

        if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }

        return query;
    }
}

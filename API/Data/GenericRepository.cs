using System;
using API.Entities;

namespace API.Data;

public class GenericRepository<T>(PostgresContext context) where T : BaseEntity
{
    public void Add(T entity)
    {
        context.Set<T>().Add(entity);
    }

    public async Task<T?> GetEntityWithSpec(string slug)
    {
        // Todo
        return null;
    }

    private IQueryable<T> ApplySpecification(Specification<T> spec)
    {
        // Todo
        return null;
    }
}

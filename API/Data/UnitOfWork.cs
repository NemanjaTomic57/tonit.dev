using System;
using System.Collections.Concurrent;
using Amazon.Runtime.Internal;
using API.Entities;

namespace API.Data;

public class UnitOfWork(PostgresContext context)
{
    private readonly ConcurrentDictionary<string, object> _repositories = new();

    public async Task<bool> Complete()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Dispose()
    {
        context.Dispose();
    }

    public GenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        var type = typeof(TEntity).Name;

        return (GenericRepository<TEntity>)_repositories.GetOrAdd(type, t =>
        {
            var repositoryType = typeof(GenericRepository<>).MakeGenericType(typeof(TEntity));
            return Activator.CreateInstance(repositoryType, context)
                ?? throw new InvalidOperationException($"Could not create instance for {t}");
        });
    }
}

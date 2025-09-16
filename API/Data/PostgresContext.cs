using API.Entities;
using API.Objects.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PostgresContext(DbContextOptions<PostgresContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<BlogSubscription> BlogSubscriptions { get; set; }
    public DbSet<LeadMagnetEmail> LeadMagnetEmails { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

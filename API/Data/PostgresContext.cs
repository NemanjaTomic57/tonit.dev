using API.Entities;
using API.Objects.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PostgresContext(DbContextOptions<PostgresContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Appointment> appointments { get; set; }
    public DbSet<BlogPost> blog_posts { get; set; }
    public DbSet<BlogSubscription> blog_subscriptions { get; set; }
    public DbSet<LeadMagnetEmail> lead_magnet_emails { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

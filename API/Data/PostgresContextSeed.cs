using API.Objects.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public class PostgresContextSeed
{
    public static async Task SeedAsync(PostgresContext context, UserManager<AppUser> userManager)
    {
        var adminUsername = Environment.GetEnvironmentVariable("ADMIN_USERNAME")!;
        var adminEmail = Environment.GetEnvironmentVariable("ADMIN_EMAIL")!;
        var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD")!;

        if (!userManager.Users.Any(u => u.UserName == adminUsername))
        {
            var user = new AppUser
            {
                UserName = adminUsername,
                Email = adminEmail,
            };

            await userManager.CreateAsync(user, adminPassword);
        }
    }
}

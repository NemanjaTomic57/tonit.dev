using API.Data;
using API.Objects.Entities;
using API.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddCors();

builder.Services.AddDbContext<PostgresContext>(opt =>
{
    opt.UseNpgsql(connectionString);
});

builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<PostgresContext>();

builder.Services.AddScoped<EmailService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Accessible at /scalar
    app.MapScalarApiReference();
}

app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://tonit.dev", "https://www.tonit.dev"));

app.UseAuthorization();

app.MapControllers();

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<PostgresContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    Console.WriteLine(ex);
    throw;
}

app.Run();

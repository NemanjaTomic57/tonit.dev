using System.Text;
using API.Data;
using API.Objects.Entities;
using API.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var baseConn = builder.Configuration.GetConnectionString("DefaultConnection")!;
var dbPassword = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
var connectionString = baseConn.Replace("{POSTGRES_PASSWORD}", dbPassword);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddCors();

builder.Services.AddDbContext<PostgresContext>(opt =>
{
    opt.UseNpgsql(connectionString);
});

builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<PostgresContext>();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!)),
            ValidIssuer = "https://api.tonit.dev",
            ValidAudience = "https://api.tonit.dev",
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
        };

        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (context.Request.Cookies.TryGetValue("jwt", out var token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddScoped(typeof(GenericRepository<>));
builder.Services.AddScoped<EmailService>();
builder.Services.AddSingleton<TokenGenerator>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Accessible at /scalar
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://tonit.dev", "https://www.tonit.dev"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<PostgresContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await PostgresContextSeed.SeedAsync(context, userManager);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
    throw;
}

app.Run();

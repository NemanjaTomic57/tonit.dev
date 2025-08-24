var builder = WebApplication.CreateBuilder(args);

var Cors = "_cors";

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: Cors,
        policy =>
        {
            policy.WithOrigins("http://127.0.0.1:3000", "https://tonit.dev", "https://www.tonit.dev").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(Cors);

app.UseAuthorization();

app.MapControllers();

app.Run();

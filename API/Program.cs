var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();

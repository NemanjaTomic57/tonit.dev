using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using API.DTOs;
using API.Objects.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdminController(SignInManager<AppUser> signInManager, TokenGenerator tokenGenerator) : BaseApiController
{
    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var user = await signInManager.UserManager.FindByNameAsync(dto.UserName);

        if (user == null || !await signInManager.UserManager.CheckPasswordAsync(user, dto.Password))
        {
            return Unauthorized();
        }

        var token = tokenGenerator.GenerateToken(user.Id, user.Email!);

        return Ok(new { token });
    }

    [HttpGet("auth-status")]
    public ActionResult GetAuthState()
    {
        return Ok(new { IsAuthenticated = User.Identity?.IsAuthenticated ?? false });
    }

    [HttpGet("user-info")]
    public ActionResult GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        return Ok(new
        {
            UserId = userId,
        });
    }
}

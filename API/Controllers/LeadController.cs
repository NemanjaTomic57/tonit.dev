using System;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LeadController(EmailService emailService) : BaseApiController
{
    [HttpPost("send-resume")]
    public ActionResult SendResume(EmailDto dto)
    {
        emailService.SendNotification(dto.Email, dto.Name);

        return Ok();
    }
}

using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LeadController(EmailService emailService) : BaseApiController
{
    [HttpPost("send-resume")]
    public ActionResult SendResume(EmailDto dto)
    {
        emailService.SendResume(dto.Email, dto.Name);

        return Ok();
    }

    [HttpPost("book-appointment")]
    public ActionResult BookAppointment(AppointmentDto dto)
    {
        return NoContent();
    }
}

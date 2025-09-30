using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LeadController(UnitOfWork unit, EmailService emailService) : BaseApiController
{
    [HttpPost("send-resume")]
    public async Task<ActionResult> SendResume(EmailDto dto)
    {
        var result = await emailService.SendResume(dto.Email, dto.Name);
        await emailService.SendNewBlogPostNotification("nemanja.tomic@ik.me", "Somebody Requested Your Resume", "https://tonit.dev");

        if (!result)
        {
            throw new BadHttpRequestException("Failed to send resume", 500);
        }

        return Ok();
    }

    [HttpGet("appointment-datetimes")]
    public ActionResult GetAppointmentDateTimeSuggestions()
    {
        var today = DateTime.UtcNow.Date;

        var weeklySlots = GetWeeklySlogs();

        var results = new List<DateTime>();

        int weeksAhead = 0;

        while (results.Count < 8)
        {
            foreach (var (day, time) in weeklySlots)
            {
                // Get the next date for this day of the week starting from this week + weeksAhead
                var baseWeekDate = today.AddDays(-(int)today.DayOfWeek + (int)day + (7 * weeksAhead));

                // Ensure the calculated date is actually after today
                if (baseWeekDate <= today)
                    continue;

                var dateTime = baseWeekDate.Add(time);

                results.Add(dateTime);

                if (results.Count == 8)
                    break;
            }

            weeksAhead++;
        }

        return Ok(results);
    }

    [HttpPost("book-appointment")]
    public async Task<ActionResult<Appointment>> BookAppointment(Appointment appointment)
    {
        unit.Repository<Appointment>().Add(appointment);

        if (!await unit.Complete())
        {
            throw new BadHttpRequestException("Failed to book appointment", 500);
        }

        var result = await emailService.SendAppointmentConfirmation(appointment.Email, appointment.Name, appointment.Company, appointment.AppointmentTime, appointment.Message);
        await emailService.SendAppointmentConfirmation("nemanja.tomic@tonit.dev", appointment.Name, appointment.Company, appointment.AppointmentTime, appointment.Message);
        await emailService.SendAppointmentConfirmation("nemanja.tomic@ik.me", appointment.Name, appointment.Company, appointment.AppointmentTime, appointment.Message);

        if (!result)
        {
            throw new BadHttpRequestException("Failed to send email", 500);
        }

        return Ok(appointment);
    }

    private static List<(DayOfWeek, TimeSpan)> GetWeeklySlogs()
    {
        return
        [
            (DayOfWeek.Tuesday,   new TimeSpan(7, 0, 0)),
            (DayOfWeek.Tuesday,   new TimeSpan(15, 0, 0)),
            (DayOfWeek.Wednesday, new TimeSpan(7, 0, 0)),
            (DayOfWeek.Wednesday, new TimeSpan(15, 30, 0)),
            // (DayOfWeek.Thursday,  new TimeSpan(7, 0, 0)),
            (DayOfWeek.Thursday,  new TimeSpan(15, 0, 0)),
            (DayOfWeek.Friday,    new TimeSpan(7, 0, 0)),
            (DayOfWeek.Friday,    new TimeSpan(15, 0, 0))
        ];
    }
}

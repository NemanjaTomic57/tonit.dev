using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LeadController(UnitOfWork unit, EmailService emailService) : BaseApiController
{
    [HttpPost("send-resume")]
    public ActionResult SendResume(EmailDto dto)
    {
        emailService.SendResume(dto.Email, dto.Name);

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
    public async Task<ActionResult<AppointmentDto>> BookAppointment(AppointmentDto dto)
    {
        var appointment = new Appointment
        {
            Name = dto.Name,
            Company = dto.Company,
            Email = dto.Email,
            AppointmentTime = dto.AppointmentTimeUtc,
            Message = dto.Message,
        };

        unit.Repository<Appointment>().Add(appointment);

        if (!await unit.Complete())
        {
            throw new BadHttpRequestException("Failed to book appointment");
        }

        return Ok(dto);
    }

    private static List<(DayOfWeek, TimeSpan)> GetWeeklySlogs()
    {
        return
        [
            (DayOfWeek.Tuesday,   new TimeSpan(8, 0, 0)),
            (DayOfWeek.Tuesday,   new TimeSpan(14, 0, 0)),
            (DayOfWeek.Wednesday, new TimeSpan(7, 0, 0)),
            (DayOfWeek.Wednesday, new TimeSpan(14, 30, 0)),
            (DayOfWeek.Thursday,  new TimeSpan(7, 0, 0)),
            (DayOfWeek.Thursday,  new TimeSpan(11, 0, 0)),
            (DayOfWeek.Friday,    new TimeSpan(7, 0, 0)),
            (DayOfWeek.Friday,    new TimeSpan(14, 0, 0))
        ];
    }
}

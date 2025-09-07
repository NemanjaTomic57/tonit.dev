using System;
using Google.Cloud.Storage.V1;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services;

public class EmailService
{
    private readonly string host = Environment.GetEnvironmentVariable("SMTP_HOST")!;
    private readonly string port = Environment.GetEnvironmentVariable("SMTP_PORT")!;
    private readonly string from = Environment.GetEnvironmentVariable("SMTP_FROM")!;
    private readonly string alias = Environment.GetEnvironmentVariable("SMTP_HOST")!;
    private readonly string username = Environment.GetEnvironmentVariable("SMTP_USERNAME")!;
    private readonly string password = Environment.GetEnvironmentVariable("SMTP_PASSWORD")!;

    public void SendNotification(string email, string name)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(name, email));
        
        var body = new TextPart("html")
        {
            Text = $@"
                <p>Hey {name}</p>
                <br/>
                <p>Thank you for reaching out! I've attached my resume and certificates for your review.</p>
                <br/>
                <p>If you have any questions or want to connect further, feel free to reply to this email 
                or call me directly under +49 176 6244 7934.</p>
                <br/>
                <p>Looking forward to hearing from you.</p>
                <br/>
                <p>Best regards,</p>
                <p>Nemanja</p>
            "
        };

        var multipart = new Multipart("mixed");
        message.Body = body;

        var client = new SmtpClient();
        client.Connect(host, int.Parse(port), false);
        client.Authenticate(username, password);
        client.Send(message);
        client.Disconnect(true);
    }
}

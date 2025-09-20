using Amazon.S3;
using Amazon.S3.Model;
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

    private readonly string b2KeyId = Environment.GetEnvironmentVariable("BACKBLAZE_KEYID")!;
    private readonly string b2AppKey = Environment.GetEnvironmentVariable("BACKBLAZE_APPKEY")!;
    private const string bucketName = "tonit-dev";
    private const string fileName = "Certificates.pdf";
    private const string serviceUrl = "https://s3.eu-central-003.backblazeb2.com";

    // Centralized signature HTML
    private const string signature = @"
        <br/><br/>
        <p>Kind regards,</p>
        <p><strong>Nemanja Tomic</strong><br/>
        Software Consultant & Developer<br/>
        <a href='https://www.tonit.dev' target='_blank'>www.tonit.dev</a> &nbsp;|&nbsp;
        <a href='https://www.tonit.dev/#contact' target='_blank'>Contact Me</a>
        </p>
    ";

    public async void SendAppointmentConfirmation(string email, string name, string company, string appointmentTime, string? question)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(name, email));
        message.Subject = "Appointment Confirmation";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Dear {name},</p>  
            <br/>
            <p>Thank you for scheduling a consultation with me. I’m looking forward to our conversation.</p>
            <p>Here is a summary of your booking:</p>
            <ul>
                <li><strong>Name:</strong> {name}</li>
                <li><strong>Email:</strong> {email}</li>
                <li><strong>Company:</strong> {company}</li>
                <li><strong>Date & Time:</strong> {appointmentTime}</li>
            {(string.IsNullOrWhiteSpace(question) ? "" : $"<li><strong>Your Message:</strong> {question}</li>")}            
            </ul>
            <p>You will receive a Zoom invitation shortly.</p>
            {signature}
            "
        };

        message.Body = body;

        await SendEmail(message);
    }

    public async void SendResume(string email, string name)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(name, email));
        message.Subject = "Requested Resume and Certificates";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Dear {name},</p>
            <br/>
            <p>Thank you for your interest. Please find attached my resume and certificates for your review.</p>
            <p>If you have any questions or would like to discuss potential collaboration, feel free to reply to this email 
            or schedule a call directly via my website at <a href='https://www.tonit.dev/#contact'>tonit.dev</a>.</p>
            {signature}
            "
        };

        using var s3Client = new AmazonS3Client(b2KeyId, b2AppKey, new AmazonS3Config
        {
            ServiceURL = serviceUrl,
            ForcePathStyle = true,
        });

        var request = new GetPreSignedUrlRequest
        {
            BucketName = bucketName,
            Key = fileName,
            Expires = DateTime.UtcNow.AddMinutes(5),
            Verb = HttpVerb.GET,
        };

        var presignedUrl = s3Client.GetPreSignedURL(request);

        using var httpClient = new HttpClient();
        using var remoteStream = await httpClient.GetStreamAsync(presignedUrl);
        using var memoryStream = new MemoryStream();
        await remoteStream.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        var certificatesAttachment = new MimePart("application", "pdf")
        {
            Content = new MimeContent(memoryStream, ContentEncoding.Default),
            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
            ContentTransferEncoding = ContentEncoding.Base64,
            FileName = "Certificates.pdf"
        };

        var multipart = new Multipart("mixed")
        {
            body,
            certificatesAttachment
        };

        message.Body = multipart;
    }

    public async Task<bool> SendSubscriptionConfirmation(string email)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(null, email));
        message.Subject = "Subscription Confirmation";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Dear Subscriber,</p>
            <br/>
            <p>Thank you for subscribing to my blog. I truly appreciate your interest in my work.</p>
            <p>If you would like to collaborate or discuss any topic further, feel free to reply directly to this email.</p>
            {signature}
            "
        };

        message.Body = body;

        return await SendEmail(message);
    }

    public async Task<bool> SendNewBlogPostNotification(string email, string title, string href)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(null, email));
        message.Subject = "New Blog Post Published";
        href = "https://tonit.dev/blog/" + href;

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Dear Subscriber,</p>
            <br/>
            <p>I’m pleased to inform you that I’ve published a new blog post titled:</p>
            <p><strong>{title}</strong></p>
            <p>
                You can read it here: 
                <a href=""{href}"" target=""_blank"">{href}</a>
            </p>
            <p>I hope you find it insightful and engaging.</p>
            {signature}
        "
        };
        message.Body = body;

        var unsubscribeUrl = $"https://tonit.dev/blog/unsubscribe?email={Uri.EscapeDataString(email)}";
        message.Headers.Add("List-Unsubscribe", $"<{unsubscribeUrl}>");

        return await SendEmail(message);
    }

    private async Task<bool> SendEmail(MimeMessage message)
    {
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(host, int.Parse(port), false);
        await smtp.AuthenticateAsync(username, password);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
        return true;
    }
}

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
    private readonly string alias = Environment.GetEnvironmentVariable("SMTP_ALIAS")!;
    private readonly string username = Environment.GetEnvironmentVariable("SMTP_USERNAME")!;
    private readonly string password = Environment.GetEnvironmentVariable("SMTP_PASSWORD")!;

    private readonly string b2KeyId = Environment.GetEnvironmentVariable("BACKBLAZE_KEYID")!;
    private readonly string b2AppKey = Environment.GetEnvironmentVariable("BACKBLAZE_APPKEY")!;
    private const string BucketName = "tonit-dev";
    private const string ResumeFileName = "Resume.pdf";
    private const string CertificatesFileName = "Certification.pdf";
    private const string ServiceUrl = "https://s3.eu-central-003.backblazeb2.com";

    private const string SignatureHtml = @"
        <br/><br/>
        <p>Kind regards,</p>
        <p><strong>Nemanja Tomic</strong><br/>
        Software Consultant & Developer<br/>
        <a href='https://www.tonit.dev' target='_blank'>www.tonit.dev</a> &nbsp;|&nbsp;
        <a href='https://www.tonit.dev/#contact' target='_blank'>Contact Me</a>
        </p>
    ";

    public async Task<bool> SendAppointmentConfirmation(string email, string name, string company, string appointmentTime, string? question)
    {
        var message = CreateBasicMessage(email, name, "Appointment Confirmation");

        var bodyHtml = $@"
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
            {SignatureHtml}";

        message.Body = new TextPart("html") { Text = bodyHtml };

        return await SendEmailAsync(message);
    }

    public async Task<bool> SendResume(string email, string name)
    {
        var message = CreateBasicMessage(email, name, "Requested Resume and Certification");

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Dear {name},</p>
            <br/>
            <p>Thank you for your interest. Please find attached my resume and certificates for your review.</p>
            <p>If you have any questions or would like to discuss potential collaboration, feel free to reply 
            to this email or schedule a call directly via my website at 
            <a href='https://www.tonit.dev/#contact'>tonit.dev</a>.</p>
            {SignatureHtml}"
        };

        using var s3Client = CreateS3Client();
        var resumeAttachment = await GetPdfAttachmentAsync(s3Client, ResumeFileName, "Resume.pdf");
        var certificatesAttachment = await GetPdfAttachmentAsync(s3Client, CertificatesFileName, "Certification.pdf");

        message.Body = new Multipart("mixed")
        {
            body,
            resumeAttachment,
            certificatesAttachment
        };

        return await SendEmailAsync(message);
    }

    public async Task<bool> SendSubscriptionConfirmation(string email)
    {
        var message = CreateBasicMessage(email, null, "Subscription Confirmation");

        var bodyHtml = $@"
            <p>Dear Subscriber,</p>
            <br/>
            <p>Thank you for subscribing to my blog. I truly appreciate your interest in my work.</p>
            <p>If you would like to collaborate or discuss any topic further, feel free to reply directly to this email.</p>
            {SignatureHtml}";

        message.Body = new TextPart("html") { Text = bodyHtml };

        return await SendEmailAsync(message);
    }

    public async Task<bool> SendNewBlogPostNotification(string email, string title, string slug)
    {
        var message = CreateBasicMessage(email, null, "New Blog Post Published");

        var href = $"https://tonit.dev/blog/{slug}";
        var bodyHtml = $@"
            <p>Dear Subscriber,</p>
            <br/>
            <p>I’m pleased to inform you that I’ve published a new blog post titled:</p>
            <p><strong>{title}</strong></p>
            <p>
                You can read it here: 
                <a href=""{href}"" target=""_blank"">{href}</a>
            </p>
            <p>I hope you find it insightful and engaging.</p>
            {SignatureHtml}";

        message.Body = new TextPart("html") { Text = bodyHtml };

        // Add unsubscribe header
        var unsubscribeUrl = $"https://tonit.dev/blog/unsubscribe?email={Uri.EscapeDataString(email)}";
        message.Headers.Add("List-Unsubscribe", $"<{unsubscribeUrl}>");

        return await SendEmailAsync(message);
    }

    private MimeMessage CreateBasicMessage(string recipientEmail, string? recipientName, string subject)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(recipientName, recipientEmail));
        message.Subject = subject;
        return message;
    }

    private AmazonS3Client CreateS3Client() =>
        new(b2KeyId, b2AppKey, new AmazonS3Config
        {
            ServiceURL = ServiceUrl,
            ForcePathStyle = true,
        });

    private static async Task<MimePart> GetPdfAttachmentAsync(AmazonS3Client s3Client, string key, string fileName)
    {
        var presignedUrl = s3Client.GetPreSignedURL(new GetPreSignedUrlRequest
        {
            BucketName = BucketName,
            Key = key,
            Expires = DateTime.UtcNow.AddMinutes(5),
            Verb = HttpVerb.GET,
        });

        using var httpClient = new HttpClient();
        using var remoteStream = await httpClient.GetStreamAsync(presignedUrl);

        var memoryStream = new MemoryStream(); // not disposed here!
        await remoteStream.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        return new MimePart("application", "pdf")
        {
            Content = new MimeContent(memoryStream, ContentEncoding.Default),
            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
            ContentTransferEncoding = ContentEncoding.Base64,
            FileName = fileName
        };
    }

    private async Task<bool> SendEmailAsync(MimeMessage message)
    {
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(host, int.Parse(port), false);
        await smtp.AuthenticateAsync(username, password);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
        return true;
    }
}

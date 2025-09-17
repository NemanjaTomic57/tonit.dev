using Amazon.S3;
using Amazon.S3.Model;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
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

    public async void SendResume(string email, string name)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(name, email));
        message.Subject = "Here's the resume you requested";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Hello {name}</p>
            <br/>
            <p>Thank you for reaching out! I've attached my resume and certificates for your review.</p>
            <br/>
            <p>If you have any questions or want to connect further, please feel free to reply to this email 
            or book a call directly on my homepage at https://www.tonit.dev/#contact.</p>
            <br/>
            <p>Looking forward to hearing from you.</p>
            <br/>
            <p>Best regards,</p>
            <p>Nemanja</p>
            "
        };

        // Backblaze S3 client
        using var s3Client = new AmazonS3Client(b2KeyId, b2AppKey, new AmazonS3Config
        {
            ServiceURL = serviceUrl,
            ForcePathStyle = true,
        });

        // Get pre-signed download URL
        var request = new GetPreSignedUrlRequest
        {
            BucketName = bucketName,
            Key = fileName,
            Expires = DateTime.UtcNow.AddMinutes(5),
            Verb = HttpVerb.GET,
        };

        var presignedUrl = s3Client.GetPreSignedURL(request);

        // Download file into seekable MemoryStream
        using var httpClient = new HttpClient();
        using var remoteStream = await httpClient.GetStreamAsync(presignedUrl);
        using var memoryStream = new MemoryStream();
        await remoteStream.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        // Create attachment
        var certificatesAttachment = new MimePart("application", "pdf")
        {
            Content = new MimeContent(memoryStream, ContentEncoding.Default),
            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
            ContentTransferEncoding = ContentEncoding.Base64,
            FileName = "Certificates.pdf"
        };

        // Combine body + attachment
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
        message.Subject = "Confirmation to your subscription";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Hello friend!</p>
            </br>
            <p>Thank you so much for subscribing to my blog. It really means a lot to me. Of course writing itself is fun, but its even more fun when you know that people are actually reading your stuff.</p>

            <p>Anyway, I will keep it short this time. If you want to work together on something, feel free to reply directly to this email adress and we can talk about it.</p>
            </br>
            <p>Best regards,</p>
            <p>Nemanja</p>
            "
        };

        message.Body = body;

        return await SendEmail(message);
    }

    public async Task<bool> SendNewBlogPostNotification(string email, string title)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(alias, from));
        message.To.Add(new MailboxAddress(null, email));
        message.Subject = "Notification: New Blog Post";

        var body = new TextPart("html")
        {
            Text = $@"
            <p>Hello friend!</p>
            </br>
            <p>I just wanted to notify you of my new blog post. The topic I'm writing about today is:</p>
            <p><strong>{title}</strong></p>
            </br>
            <p>Wish you all the best</p>
            <p>Nemanja</p>
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

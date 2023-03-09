using API.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmail(string senderEmail, string senderName, string subject, string emailContent)
        {
            //var apiKey = config.GetValue<string>("SendGridApiKey");
            // var apiKey = _config.GetSection("SendGridApiKey").Value;
            var apiKey = _config["SendGridApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("mehraaaan@hotmail.com", "Hviding AsylCenter");
            var to = new EmailAddress(senderEmail, senderName);
            var htmlContent = $"<strong>{emailContent}</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, emailContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
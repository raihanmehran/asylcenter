using API.Interfaces;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        string _apiKey = "";
        public EmailService(IOptions<string> config)
        {
            _apiKey = config.Value.ToString();
        }
        public async Task SendEmail(string senderEmail, string senderName, string subject, string emailContent)
        {
            //var apiKey = config.GetValue<string>("SendGridApiKey");
            // var apiKey = _config.GetSection("SendGridApiKey").Value;
            var apiKey = _apiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("mehraaaan@hotmail.com", "Hviding AsylCenter");
            var to = new EmailAddress(senderEmail, senderName);
            var htmlContent = $"<strong>{emailContent}</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, emailContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
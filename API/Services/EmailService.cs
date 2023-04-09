using API.Helpers;
using API.Interfaces;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private string _apiKey;

        public EmailService(IOptions<SendGridSettings> config)
        {
            _apiKey = config.Value.ApiKey;
        }
        public async Task SendEmail(string senderEmail, string senderName, string subject)
        {
            var apiKey = _apiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("raihan.mehran1073@gmail.com", "Hviding AsylCenter");
            var emailContent = $"Hello {senderName},\n\nYou got a post from the Hviding AsylCenter, please login to your account and check it out!\n\nLink to your post: https://localhost:4200/post/list \n\nSincerely,\nHviding AsylCenter";
            var to = new EmailAddress(senderEmail, senderName);
            var htmlContent = $"<strong>{emailContent}</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, emailContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
        public async Task<Response> ContactDeveloper(string senderEmail, string senderName, string message)
        {
            var apiKey = _apiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(senderEmail, senderName);
            var emailContent = message;
            var subject = $"{senderName} wants to contact";
            var to = new EmailAddress("mehraaaan@hotmail.com", "Mehran");
            var htmlContent = $"<strong>{emailContent}</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, emailContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
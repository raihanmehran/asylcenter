using SendGrid;

namespace API.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string senderEmail, string senderName, string subject);
        Task ContactDeveloper(string senderEmail, string senderName, string message);
    }
}
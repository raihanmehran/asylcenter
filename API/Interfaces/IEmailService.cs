using SendGrid;

namespace API.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string senderEmail, string senderName, string subject);
        Task<Response> ContactDeveloper(string senderEmail, string senderName, string message);
    }
}
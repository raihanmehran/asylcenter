using API.Entities;

namespace API.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<EventFeedback> GetEventFeedback(int eventId, string idNumber);
    }
}
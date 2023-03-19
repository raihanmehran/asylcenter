using API.Entities;

namespace API.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<IEnumerable<EventFeedback>> GetEventFeedback(int eventId);
        Task AddEventFeedback(EventFeedback feedback);
    }
}
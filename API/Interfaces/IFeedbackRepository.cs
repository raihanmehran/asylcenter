using API.Entities;

namespace API.Interfaces
{
    public interface IFeedbackRepository
    {

        Task<EventFeedback> GetEventFeedback(int feedbackId);
        Task<EventFeedback> GetEventFeedback(string idNumber, int eventId);
        Task AddEventFeedback(EventFeedback feedback);


    }
}
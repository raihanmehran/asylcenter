using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IEventRepository
    {
        Task<bool> SaveAllAsync();
        Task AddEvent(Event events);
        Task<Event> GetEvent(int eventId);
        Task<IEnumerable<Event>> GetEvents();
        void UpdateEvent(Event events);
        Task AddEventFeedback(EventFeedback feedback);
        Task<IEnumerable<UserDto>> GetLikedFeedbackUser(int eventId);
    }
}
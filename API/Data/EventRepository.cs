using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EventRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddEvent(Event events)
        {
            await _context.Events.AddAsync(events);
        }

        public async Task<Event> GetEvent(int eventId)
        {
            return await _context.Events
                .Where(e => e.Id == eventId)
                .Where(e => e.IsDeleted == false)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _context.Events
                .Include(e => e.EventFeedback)
                .Where(e => e.IsDeleted == false)
                .Where(e => e.IsCompleted == false)
                .OrderBy(e => e.Date)
                .ThenBy(e => e.Time)
                .ToListAsync();
        }
        public Task AddEventFeedback(EventFeedback feedback)
        {
            throw new NotImplementedException();
        }

        public void UpdateEvent(Event events)
        {
            _context.Entry(events).State = EntityState.Modified;
        }
        public async Task<IEnumerable<UserDto>> GetLikedFeedbackUsers(int eventId)
        {
            var likes = await _context.EventFeedbacks
                .Where(e => e.EventId == eventId && e.Liked == true)
                .ToListAsync();

            return await GetFeedbackUsers(likes);
        }

        public async Task<IEnumerable<UserDto>> GetInterestedFeedbackUsers(int eventId)
        {
            var interests = await _context.EventFeedbacks
                .Where(e => e.EventId == eventId && e.Interested == true)
                .ToListAsync();

            return await GetFeedbackUsers(interests);
        }

        public async Task<IEnumerable<UserDto>> GetCommentedFeedbackUsers(int eventId)
        {
            var comments = await _context.EventFeedbacks
                .Where(e => e.EventId == eventId && e.Comment != null)
                .ToListAsync();

            return await GetFeedbackUsers(comments);
        }

        private async Task<IEnumerable<UserDto>> GetFeedbackUsers(List<EventFeedback> feedbacks)
        {
            var ids = new string[feedbacks.Count];

            for (int i = 0; i < ids.Length; i++)
            {
                ids[i] = feedbacks[i].IdNumber;
            }

            var users = await _context.Users
                .Include(x => x.Photos)
                .Where(x => ids.Contains(x.IdNumber))
                .ToListAsync();

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<int> GetAllEventsCount()
        {
            return await _context.Events
                .Where(e => e.IsDeleted != true)
                .CountAsync();
        }

    }
}
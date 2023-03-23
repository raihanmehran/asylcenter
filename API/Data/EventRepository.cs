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
        public async Task<IEnumerable<UserDto>> GetLikedFeedbackUser(int eventId)
        {
            var likes = await _context.EventFeedbacks
                .Where(e => e.EventId == eventId && e.Liked == true)
                .ToListAsync();
            var ids = new string[likes.Count];

            for (int i = 0; i < ids.Length; i++)
            {
                ids[i] = likes[i].IdNumber;
            }

            var users = await _context.Users
                .Where(x => ids.Contains(x.IdNumber))
                .ToListAsync();

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
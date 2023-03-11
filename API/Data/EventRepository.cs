using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;

        public EventRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddEvent(Event events)
        {
            await _context.Events.AddAsync(events);
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _context.Events
                .Where(e => e.IsDeleted == false)
                .Where(e => e.IsCompleted == false)
                .OrderByDescending(e => e.Created)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
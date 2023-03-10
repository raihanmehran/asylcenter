using API.Entities;
using API.Interfaces;

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

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DataContext _context;

        public FeedbackRepository(DataContext context)
        {
            _context = context;
        }

        public Task AddEventFeedback(EventFeedback feedback)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EventFeedback>> GetEventFeedback(int eventId)
        {
            return await _context.EventFeedbacks
                .Where(e => e.EventId == eventId)
                .ToListAsync();
        }
    }
}
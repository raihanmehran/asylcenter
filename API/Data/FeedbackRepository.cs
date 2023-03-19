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

        public async Task AddEventFeedback(EventFeedback feedback)
        {
            await _context.EventFeedbacks.AddAsync(feedback);
        }

        public async Task<IEnumerable<EventFeedback>> GetEventFeedback(int eventId)
        {
            return await _context.EventFeedbacks
                .Where(e => e.EventId == eventId)
                .ToListAsync();
        }
    }
}
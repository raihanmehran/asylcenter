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

        public async Task<EventFeedback> GetEventFeedback(int feedbackId)
        {
            return await _context.EventFeedbacks
                .Where(e => e.Id == feedbackId)
                .SingleOrDefaultAsync();
        }

        public async Task<EventFeedback> GetEventFeedback(string idNumber, int eventId)
        {
            return await _context.EventFeedbacks
                .Where(f => f.IdNumber == idNumber && f.EventId == eventId)
                .OrderByDescending(f => f.Id)
                .FirstOrDefaultAsync();
        }
    }
}
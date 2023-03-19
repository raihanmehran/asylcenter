using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DataContext _context;

        public FeedbackRepository(DataContext context)
        {
            _context = context;
        }
        public Task<EventFeedback> GetEventFeedback(int eventId, string idNumber)
        {
            throw new NotImplementedException();
        }
    }
}
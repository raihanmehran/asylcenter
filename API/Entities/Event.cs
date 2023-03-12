namespace API.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string Location { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        public bool IsCompleted { get; set; } = false;
        public int AddedBy { get; set; }
        public List<EventFeedback> EventFeedback { get; set; } = new();
    }
}
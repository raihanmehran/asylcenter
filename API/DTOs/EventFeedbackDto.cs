namespace API.DTOs
{
    public class EventFeedbackDto
    {
        public int Id { get; set; }
        public bool Liked { get; set; }
        public bool Interested { get; set; }
        public string Comment { get; set; }
        public string IdNumber { get; set; }
        public int EventId { get; set; }
    }
}
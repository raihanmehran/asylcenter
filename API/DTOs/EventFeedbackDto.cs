namespace API.DTOs
{
    public class EventFeedbackDto
    {
        public int Id { get; set; }
        public bool Like { get; set; }
        public bool Interested { get; set; }
        public string Comment { get; set; }
    }
}
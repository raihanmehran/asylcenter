namespace API.DTOs
{
    public class EventLikesDto
    {
        public int Id { get; set; }
        public bool Liked { get; set; }
        public string IdNumber { get; set; }
        public int EventId { get; set; }
    }
}
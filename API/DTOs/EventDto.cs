using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
    }
}
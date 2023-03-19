using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("EventFeedback")]
    public class EventFeedback
    {
        public int Id { get; set; }
        public bool Liked { get; set; } = false;
        public bool Interested { get; set; } = false;
        public string Comment { get; set; }
        public string IdNumber { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Posts")]
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCollected { get; set; } = false;
        public int AppUserId { get; set; }
        public int AddedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser AppUser { get; set; }
    }
}
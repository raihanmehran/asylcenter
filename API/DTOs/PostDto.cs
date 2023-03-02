namespace API.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCollected { get; set; }
        public DateTime Created { get; set; }
        public int AppUserId { get; set; }
        public int AddedBy { get; set; }
    }
}
namespace API.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int UserId { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}
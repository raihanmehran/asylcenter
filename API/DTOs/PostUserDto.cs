namespace API.DTOs
{
    public class PostUserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IdNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
    }
}
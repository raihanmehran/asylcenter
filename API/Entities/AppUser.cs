namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IdNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public bool IsAccountActive { get; set; } = true;
        public virtual Photo Photo { get; set; } = new();
    }
}
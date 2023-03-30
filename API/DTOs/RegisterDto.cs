using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string IdNumber { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 3)]
        public string Country { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        [Required]
        public DateOnly? DateOfBirth { get; set; }
    }
}
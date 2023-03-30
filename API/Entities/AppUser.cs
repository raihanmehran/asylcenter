using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string IdNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Language { get; set; }
        public string Address { get; set; }
        public bool IsAccountActive { get; set; } = true;
        public List<Photo> Photos { get; set; } = new();

        public ICollection<AppUserRole> UserRoles { get; set; }

        // public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge();
        // }
    }
}
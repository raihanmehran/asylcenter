﻿using Microsoft.AspNetCore.Identity;

namespace asylcenter.Domain.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int IdNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string? Gender { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Language { get; set; }
        public string Country { get; set; }
        public Photo Photo { get; set; } = new();
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}

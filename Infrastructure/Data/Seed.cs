using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace asylcenter.Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedUsers(
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager,
            IMapper mapper)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("../Infrastructure/Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole{Name = "User"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.IdNumber.ToString();
                await userManager.CreateAsync(user, user.IdNumber.ToString()); // for password
                await userManager.AddToRoleAsync(user, "User");
            }

            var admin = new RegisterDto
            {
                IdNumber = 100001,
                FirstName = "Admin",
                LastName = "Admin",
                DateOfBirth = DateTime.Now,
                Country = "Danmark"
            };

            var adminUser = mapper.Map<AppUser>(admin);
            adminUser.UserName = "admin";

            await userManager.CreateAsync(adminUser, "admin1");
            await userManager.AddToRolesAsync(adminUser, new[] { "Admin", "Moderator" });
        }
    }
}

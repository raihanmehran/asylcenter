using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>{
                new AppRole{Name="Member"},
                new AppRole{Name="Admin"},
                new AppRole{Name="Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role: role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                // Note: If error comes with UTC date while seeding data to a new db, use the following code:
                user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);

                await userManager.CreateAsync(user: user, password: "Pass");
                await userManager.AddToRoleAsync(user: user, role: "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(user: admin, password: "admin");
            await userManager.AddToRolesAsync(user: admin, new[] { "Admin", "Moderator" });
        }
    }
}
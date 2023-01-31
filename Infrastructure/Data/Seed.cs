using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace asylcenter.Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("../Infrastructure/Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.IdNumber.ToString();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.IdNumber.ToString())); // password
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();

            //var admin = new RegisterDto
            //{
            //    IdNumber = 100001,
            //    FirstName = "Admin",
            //    LastName = "Admin",
            //    DateOfBirth = DateTime.Now,
            //    Country = "Danmark"
            //};
        }
    }
}

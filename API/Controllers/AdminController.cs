using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRole()
        {
            var users = await _userManager.Users
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    FirstName = u.FirstName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                }).ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRole(string username, [FromQuery] string roles)
        {
            if (string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role");

            var selectedRoles = roles.Split(",".ToArray());
            var user = await _userManager.FindByNameAsync(userName: username);

            if (user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user: user);
            var result = await _userManager.AddToRolesAsync(user: user, roles: selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failded to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to removed from roles");

            return Ok(await _userManager.GetRolesAsync(user: user));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("reset-password")]
        public async Task<ActionResult> ResetPassword(string username, string password)
        {
            if (string.IsNullOrEmpty(username)) return BadRequest("No User selected!");
            if (string.IsNullOrEmpty(password)) return BadRequest("No password to update!");

            var user = await _userManager.FindByNameAsync(userName: username);

            if (user == null) return NotFound();

            var token = await _userManager.GeneratePasswordResetTokenAsync(user: user);
            var result = await _userManager.ResetPasswordAsync(user: user, token: token, newPassword: password);

            if (!result.Succeeded) return BadRequest("Failed to update the password");

            return NoContent();

        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}
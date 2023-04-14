using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetAllUsersAsync();
        Task<IEnumerable<AppUser>> GetAllUsersNoPhotosAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<UserDto>> GetUsersAsync(UserParams userParams);
        Task<UserDto> GetUserAsync(string username);
        Task<int> GetUsersCountByRole(string roleName);
        Task<IEnumerable<UsersByRoleAndMonthDto>> GetUsersCountByRolePerMonth(string roleName);
    }
}
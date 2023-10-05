using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly RoleManager<AppRole> _roleManager;
        public UserRepository(DataContext context, IMapper mapper, RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<IEnumerable<AppUser>> GetAllUsersNoPhotosAsync()
        {
            return await _context.Users
                .ToListAsync();
        }
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<UserDto> GetUserAsync(string username)
        {
            return await _context.Users
                .Where(u => u.UserName == username)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

        }

        public async Task<PagedList<UserDto>> GetUsersAsync(UserParams userParams)
        {
            // return await _context.Users
            //     .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            //     .ToListAsync();

            // var query = _context.Users
            //     .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            //     .AsNoTracking();

            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateOnly.FromDateTime(
                DateTime.Today.AddYears(-userParams.MaxAge - 1));

            var maxDob = DateOnly.FromDateTime(
                DateTime.Today.AddYears(-userParams.MinAge));

            query = query.Where(user => user.DateOfBirth >= minDob &&
                user.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<UserDto>
                .CreateAsync(
                    query.AsNoTracking().ProjectTo<UserDto>(_mapper.ConfigurationProvider),
                    userParams.PageNumber,
                    userParams.PageSize);
        }

        public async Task<int> GetUsersCountByRole(string roleName)
        {
            var appRole = await GetRole(roleName: roleName);
            return await _context.Users
                .Where(u => u.UserRoles.Any(r => r.RoleId == appRole.Id))
                .CountAsync();
        }
        public async Task<IEnumerable<UsersByRoleAndMonthDto>> GetUsersCountByRolePerMonth(string roleName)
        {
            var appRole = await GetRole(roleName: roleName);

            return await _context.Users
                .Where(u => u.UserRoles.Any(r => r.RoleId == appRole.Id))
                .GroupBy(u => new { Month = u.Created.Month, Year = u.Created.Year })
                .Select(g => new UsersByRoleAndMonthDto
                {
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Count = g.Count(),
                    RoleName = roleName
                })
                .ToListAsync();
        }
        public async Task<AppRole> GetRole(string roleName)
        {
            return await _roleManager.FindByNameAsync(roleName: roleName);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Gender)
                .FirstOrDefaultAsync();
        }
    }
}
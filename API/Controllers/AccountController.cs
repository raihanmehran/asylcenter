using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(
            DataContext context,
            ITokenService tokenService,
            IMapper mapper
        )
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoggedDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(u =>
                    u.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            return new UserLoggedDto
            {
                UserId = user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                FirstName = user.FirstName,
                Gender = user.Gender
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username;

            _context.Users.Add(user);

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Something went wrong while registering a new user");
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == username);
        }
    }
}
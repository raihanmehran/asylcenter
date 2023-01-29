using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using asylcenter.Application.Services.TokenService;
using asylcenter.Infrastructure.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace asylcenter.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthRepository(
            DataContext context, 
            TokenService tokenService, 
            IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> Authenticate(LoginDto loginDto)
        {
            var response = new ResponseMessage();

            var user = await _context.Users
                .Include(p => p.Photo)
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null)
            {
                response.Message = "Invalid Username";
                return response;                
            }

            using var hmac = new HMACSHA512(user.PasswordSale);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i=0;i<computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    response.Message = "Invalid Password";
                    return response;
                }
            }
            response.Message = $"{loginDto.Username} Authenticated";
            response.Data = new UserDto
            {
                UserName = loginDto.Username,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photo.Url,
                Created = user.Created,
                LastActive = user.LastActive,
                Country = user.Country,
                Email = user.Email,
                Phone = user.Phone,
                Gender = user.Gender,
                Language = user.Language
            };

            return response;
        }
    }
}

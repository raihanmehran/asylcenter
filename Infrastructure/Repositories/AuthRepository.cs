using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using asylcenter.Application.Services.TokenService;
using asylcenter.Domain.Entities;
using asylcenter.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace asylcenter.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthRepository(
            UserManager<AppUser> userManager, 
            ITokenService tokenService, 
            IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> Authenticate(LoginDto loginDto)
        {
            var response = new ResponseMessage();

            var user = await _userManager.Users
                .Include(p => p.Photo)
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null)
            {
                response.Message = "Invalid Username";
                return response;                
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(!result)
            {
                response.Message = "Invalid Password";
                return response;
            }

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Token = _tokenService.CreateToken(user);

            response.Message = $"{loginDto.Username} Authenticated";
            response.Data = userDto;

            //response.Data = new UserDto
            //{
            //    UserName = loginDto.Username,
            //    Token = _tokenService.CreateToken(user),
            //    PhotoUrl = user.Photo.Url,
            //    Created = user.Created,
            //    LastActive = user.LastActive,
            //    Country = user.Country,
            //    Email = user.Email,
            //    Phone = user.Phone,
            //    Gender = user.Gender,
            //    Language = user.Language
            //};

            return response;
        }
    }
}

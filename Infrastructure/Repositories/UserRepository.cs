using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using asylcenter.Domain.Entities;
using asylcenter.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace asylcenter.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public UserRepository(UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> Register(RegisterDto registerDto)
        {
            var response = new ResponseMessage();

            if(await UserExists(registerDto.IdNumber.ToString()))
            {
                response.Message = "ID alredy exists";
                return response;
            }

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.IdNumber.ToString();

            var result = await _userManager.CreateAsync(user, registerDto.IdNumber.ToString()); // here idnumber is used for password

            if (!result.Succeeded) 
            {
                response.Message = result.Errors.ToString();
                return response;
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded)
            {
                response.Message = result.Errors.ToString();
                return response;
            }

            var userDto = _mapper.Map<UserDto>(user);

            response.Message = $"{user.FirstName} User added successfully";
            response.Data = userDto;            

            return response;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(u =>
                u.UserName == username);
        }
    }
}

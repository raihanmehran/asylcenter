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
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AccountRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> Register(RegisterDto registerDto)
        {
            var response = new ResponseMessage();

            if (await UserExists(registerDto.IdNumber.ToString()))
            {
                response.Message = "ID already exists";
                return response;
            }

            var user = _mapper.Map<AppUser>(registerDto);
            
            using var hmac = new HMACSHA512();

            user.UserName = registerDto.IdNumber.ToString();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.IdNumber.ToString()));
            user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userDto = _mapper.Map<UserDto>(user);

            response.Message = $"{user.FirstName} User added successfully";
            response.Data = userDto;

            return response;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u =>
                u.UserName == username.ToString());
        }
    }
}

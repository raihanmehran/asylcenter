using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using asylcenter.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using asylcenter.Domain.Entities;
using System.Security.Claims;
using asylcenter.Application.Helpers;

namespace asylcenter.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .SingleOrDefaultAsync(u => u.UserName == username);
        }
        
        public async Task<ResponseMessage> UpdateUser(UserUpdateDto userUpdateDto)
        {
            ClaimsPrincipal User = null;
            var response = new ResponseMessage();

            var user = await GetUserByUsernameAsync(User.GetUsername());

            if(user == null)
            {
                response.Message = "User not found";
                return response;
            }

            var userUpdate = _mapper.Map(userUpdateDto, user);

            if(await _context.SaveChangesAsync() > 0)
            {
                response.Message = "Success";
                response.Data = userUpdate;
                return response;
            }

            response.Message = "Failed to update user";
            return response;


            //if (await UserExists)
            


            throw new NotImplementedException();
        }

        
    }
}

using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using asylcenter.Domain.Entities;
using asylcenter.Infrastructure.Data;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using asylcenter.Application.Helpers;
using Microsoft.AspNetCore.Authorization;

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

        public async Task<ResponseMessage> GetUserByUsernameAsync(string username)
        {
            var response = new ResponseMessage();
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.UserName == username);

            response.Message = "Success";
            response.Data = user;

            return response;
        }

        public async Task<ResponseMessage> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var response = new ResponseMessage();

            var username = User.GetUsername();

            var user = await GetUserByUsernameAsync();
            

            ////if (await UserExists)


            throw new NotImplementedException();
        }

        
    }
}

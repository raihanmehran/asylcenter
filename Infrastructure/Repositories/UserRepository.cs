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
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        public Task<ResponseMessage> Update(AppUser user)
        {
            //var response = new ResponseMessage();

            ////if (await UserExists)

            //return response;

            throw new NotImplementedException();
        }

        
    }
}

using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;

namespace asylcenter.Application.Interfaces
{
    public interface IUserRepository
    {
        //Task<ResponseMessage> Update(AppUser user);
        //Task<ResponseMessage> GetUsersAsync();
        //Task<ResponseMessage> GetUserByUsernameAsync(string username);
        public Task<ResponseMessage> Register(RegisterDto registerDto);
        public Task<bool> UserExists(string username); 

    }
}

using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;

namespace asylcenter.Application.Interfaces
{
    public interface IUserRepository
    {
        public Task<ResponseMessage> Update(AppUser user);
        //Task<ResponseMessage> GetUsersAsync();
        //Task<ResponseMessage> GetUserByUsernameAsync(string username);         

    }
}

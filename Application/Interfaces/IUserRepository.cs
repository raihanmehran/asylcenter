using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;

namespace asylcenter.Application.Interfaces
{
    public interface IUserRepository
    {
        public Task<ResponseMessage> UpdateUser(UserUpdateDto userUpdateDto);
        //Task<ResponseMessage> GetUsersAsync();
        public Task<AppUser> GetUserByUsernameAsync(string username);         

    }
}

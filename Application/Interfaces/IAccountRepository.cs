using asylcenter.Application.DTOs;

namespace asylcenter.Application.Interfaces
{
    public interface IAccountRepository
    {
        public Task<ResponseMessage> Register(RegisterDto registerDto);
        public Task<bool> UserExists(string username);
    }
}

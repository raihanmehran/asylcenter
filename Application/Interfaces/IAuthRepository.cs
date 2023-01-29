using asylcenter.Application.DTOs;

namespace asylcenter.Application.Interfaces
{
    public interface IAuthRepository
    {
        public Task<ResponseMessage> Authenticate(LoginDto loginDto);
    }
}

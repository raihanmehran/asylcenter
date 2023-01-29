using asylcenter.Domain.Entities;

namespace asylcenter.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}

using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.UsersService.Query
{
    public class UserExistsQueryHandler : IRequestHandler<UserExistsQuery, bool>
    {
        private readonly IUserRepository _userRepository;

        public UserExistsQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> Handle(UserExistsQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.UserExists(request.Username);
        }
    }
}

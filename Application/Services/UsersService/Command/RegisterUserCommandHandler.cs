using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.UsersService.Command
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, ResponseMessage>
    {
        private readonly IUserRepository _userRepository;

        public RegisterUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ResponseMessage> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.Register(request.RegisterDto);
        }
    }
}

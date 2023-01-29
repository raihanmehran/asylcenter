using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.AuthService.Command
{
    public class AuthenticateCommandHandler : IRequestHandler<AuthenticateCommand, ResponseMessage>
    {
        private readonly IAuthRepository _authRepository;

        public AuthenticateCommandHandler(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<ResponseMessage> Handle(AuthenticateCommand request, CancellationToken cancellationToken)
        {
            return await _authRepository.Authenticate(request.User);
        }
    }
}

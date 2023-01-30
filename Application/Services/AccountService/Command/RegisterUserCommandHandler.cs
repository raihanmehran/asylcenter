using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.AccountService.Command
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, ResponseMessage>
    {
        private readonly IAccountRepository _accountRepository;

        public RegisterUserCommandHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<ResponseMessage> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            return await _accountRepository.Register(request.RegisterDto);
        }
    }
}

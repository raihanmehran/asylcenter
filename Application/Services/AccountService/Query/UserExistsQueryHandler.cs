using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.AccountService.Query
{
    public class UserExistsQueryHandler : IRequestHandler<UserExistsQuery, bool>
    {
        private readonly IAccountRepository _accountRepository;

        public UserExistsQueryHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<bool> Handle(UserExistsQuery request, CancellationToken cancellationToken)
        {
            return await _accountRepository.UserExists(request.Username);
        }
    }
}

using asylcenter.Application.DTOs;
using MediatR;

namespace asylcenter.Application.Services.AuthService.Command
{
    public class AuthenticateCommand : IRequest<ResponseMessage>
    {
        public LoginDto User { get; set; }
    }
}

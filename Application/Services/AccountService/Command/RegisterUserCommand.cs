using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;
using MediatR;

namespace asylcenter.Application.Services.AccountService.Command
{
    public class RegisterUserCommand : IRequest<ResponseMessage>
    {
        public RegisterDto RegisterDto { get; set; }
    }
}

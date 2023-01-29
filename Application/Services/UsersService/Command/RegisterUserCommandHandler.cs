using asylcenter.Application.DTOs;
using MediatR;

namespace asylcenter.Application.Services.UsersService.Command
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, ResponseMessage>
    {
        public RegisterUserCommandHandler()
        {

        }
        public Task<ResponseMessage> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            
        }
    }
}

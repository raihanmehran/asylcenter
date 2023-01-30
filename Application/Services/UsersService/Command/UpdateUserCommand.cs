using asylcenter.Application.DTOs;
using MediatR;

namespace asylcenter.Application.Services.UsersService.Command
{
    public class UpdateUserCommand : IRequest<ResponseMessage>
    {
        public UserUpdateDto UserUpdateDto { get; set; }
    }
}

using asylcenter.Application.DTOs;
using asylcenter.Application.Interfaces;
using MediatR;

namespace asylcenter.Application.Services.UsersService.Command
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, ResponseMessage>
    {
        private readonly IUserRepository _userRepository;

        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ResponseMessage> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.UpdateUser(request.UserUpdateDto);
        }
    }
}

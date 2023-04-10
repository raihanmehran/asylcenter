using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize(Policy = "RequireAdminRole")]
    public class DashboardHub : Hub
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public DashboardHub(
            IUserRepository userRepository,
            IMapper mapper
        )
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var users = await _userRepository.GetAllUsersNoPhotosAsync();

            



        }
    }
}
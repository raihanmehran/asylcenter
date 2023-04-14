using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class DashboardHub : Hub
    {
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public DashboardHub(
            IUserRepository userRepository,
            IPostRepository postRepository,
            IEventRepository eventRepository,
            IMapper mapper
        )
        {
            _userRepository = userRepository;
            _postRepository = postRepository;
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var memberUsers = await _userRepository.GetUsersCountByRolePerMonth(roleName: "Member");
            var moderatorUsers = await _userRepository.GetUsersCountByRolePerMonth(roleName: "Moderator");
            var adminUsers = await _userRepository.GetUsersCountByRolePerMonth(roleName: "Admin");
            var postsCount = await _postRepository.GetAllPostsCount();
            var eventsCount = await _eventRepository.GetAllEventsCount();

            await Clients.All.SendAsync("GetDashboardUsers",
                memberUsers, moderatorUsers, adminUsers, postsCount, eventsCount);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
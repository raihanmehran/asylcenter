using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class DashboardHub : Hub
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public DashboardHub(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var memberUsers = await _uow.UserRepository.GetUsersCountByRolePerMonth(roleName: "Member");
            var moderatorUsers = await _uow.UserRepository.GetUsersCountByRolePerMonth(roleName: "Moderator");
            var adminUsers = await _uow.UserRepository.GetUsersCountByRolePerMonth(roleName: "Admin");
            var postsCount = await _uow.PostRepository.GetAllPostsCount();
            var eventsCount = await _uow.EventRepository.GetAllEventsCount();

            await Clients.All.SendAsync("GetDashboardUsers",
                memberUsers, moderatorUsers, adminUsers, postsCount, eventsCount);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
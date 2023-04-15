using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PostHub : Hub
    {
        private readonly IUnitOfWork _uow;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IHubContext<PresenceHub> _presenceHub;

        public PostHub(
            IUnitOfWork uow,
            IEmailService emailService,
            IMapper mapper,
            IHubContext<PresenceHub> presenceHub
            )
        {
            _mapper = mapper;
            _presenceHub = presenceHub;
            _uow = uow;
            _emailService = emailService;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUserId = httpContext.Request.Query["user"];
            var currentUserId = Context.User.GetUserId();
            var groupName = GetGroupName(currentUserId, int.Parse(otherUserId));

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var posts = await _uow.PostRepository.GetAllPostsForUserByUserId(userId: int.Parse(otherUserId));

            await Clients.Caller.SendAsync("ReceivePosts", posts);
        }

        public async Task AddUserPost(PostDto postDto)
        {
            System.Console.WriteLine("post entered!");
            if (postDto.AppUserId <= 0) throw new HubException("User not found!");
            var sender = Context.User.GetUserId();
            postDto.AddedBy = sender;

            if (postDto.AddedBy <= 0) throw new HubException("User not found!");

            var post = new Post
            {
                Title = postDto.Title,
                Description = postDto.Description,
                AddedBy = postDto.AddedBy,
                AppUserId = postDto.AppUserId
            };

            await _uow.PostRepository.AddPost(post);

            System.Console.WriteLine("post to be added!");

            var user = await _uow.UserRepository.GetUserByIdAsync(id: postDto.AppUserId);

            if (!string.IsNullOrEmpty(user.Email))
            {
                _emailService.SendEmail(
                    senderEmail: user.Email,
                    senderName: user.FirstName,
                    subject: postDto.Title
                ).Wait();
            }

            if (await _uow.Complete())
            {
                var groupName = GetGroupName(post.AddedBy, post.AppUserId);
                //await Clients.Group(groupName).SendAsync("AddNewPost", _mapper.Map<PostDto>(post));
                //await Clients.All.SendAsync("AddNewPost", _mapper.Map<PostDto>(post));

                // These lines to notify the exact user for which the post belong, but need to be fixed!
                var connections = await PresenceTracker.GetConnectionsForUser(post.AppUserId.ToString());
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                        new { idNumber = user.IdNumber, firstName = user.FirstName, postId = post.Id });
                }

                await Clients.Others.SendAsync("AddNewPost", _mapper.Map<PostDto>(post));
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        private string GetGroupName(int sender, int receiver)
        {
            // var stringCompare = string.CompareOrdinal(sender, receiver) < 0;
            return sender < receiver ? $"{sender}-{receiver}" : $"{receiver}-{sender}";
        }
    }
}
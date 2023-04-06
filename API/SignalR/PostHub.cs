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
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        public PostHub(
            IPostRepository postRepository,
            IUserRepository userRepository,
            IEmailService emailService,
            IMapper mapper)
        {
            _mapper = mapper;
            _emailService = emailService;
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUserId = httpContext.Request.Query["user"];
            System.Console.WriteLine(otherUserId + " ============");
            var currentUserId = Context.User.GetUserId();
            var groupName = GetGroupName(currentUserId, int.Parse(otherUserId));

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var posts = await _postRepository.GetAllPostsForUserByUserId(userId: int.Parse(otherUserId));

            await Clients.Caller.SendAsync("ReceivePosts", posts);


            // try 1:
            // var httpContext = Context.GetHttpContext();
            // var otherUser = int.Parse(httpContext.Request.Query["user"]);
            // System.Console.WriteLine("========================");
            // System.Console.WriteLine("Id: " + otherUser);
            // var groupName = GetGroupName(Context.User.GetUserId(), otherUser);

            // await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            // var posts = await _postRepository.GetAllPostsForUserByUserId(otherUser);

            // await Clients.Group(groupName).SendAsync("ReceivePost", posts);
        }

        public async Task AddUserPost(PostDto postDto)
        {
            // try 2:



            // try 1:
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

            await _postRepository.AddPost(post);

            System.Console.WriteLine("post to be added!");

            var user = await _userRepository.GetUserByIdAsync(id: postDto.AppUserId);

            if (!string.IsNullOrEmpty(user.Email))
            {
                _emailService.SendEmail(
                    senderEmail: user.Email,
                    senderName: user.FirstName,
                    subject: postDto.Title
                ).Wait();
            }

            if (await _postRepository.SaveAllAsync())
            {
                //var groupName = GetGroupName(post.AddedBy, post.AppUserId);
                //await Clients.Group(groupName).SendAsync("AddNewPost", _mapper.Map<PostDto>(post));

                //await Clients.All.SendAsync("AddNewPost", _mapper.Map<PostDto>(post));
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
            // return stringCompare ? $"{sender}-{receiver}" : $"{receiver}-{sender}";
            return sender < receiver ? $"{sender}-{receiver}" : $"{receiver}-{sender}";
        }
    }
}
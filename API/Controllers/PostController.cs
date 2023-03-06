using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostController : BaseApiController
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public PostController(IPostRepository postRepository, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _postRepository = postRepository;
        }

        [HttpPost("add-post")]
        public async Task<ActionResult> AddPost(PostDto postDto)
        {
            if (postDto.AppUserId <= 0) return NotFound();

            postDto.AddedBy = User.GetUserId();

            if (postDto.AddedBy <= 0) return NotFound();

            //var post = _mapper.Map<Post>(postDto);

            var post = new Post
            {
                Title = postDto.Title,
                Description = postDto.Description,
                AddedBy = postDto.AddedBy,
                AppUserId = postDto.AppUserId
            };

            await _postRepository.AddPost(post);

            if (await _postRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add post");
        }

        [HttpGet("get-post/{postId}")]
        public async Task<ActionResult<PostDto>> GetPost(int postId)
        {
            if (postId <= 0) return BadRequest("Cannot find post with no or zero id");
            if (!(await _postRepository.PostExists(postId: postId))) return NotFound();

            var post = await _postRepository.GetPost(postId: postId);

            // var postDto = new PostDto
            // {
            //     Title = post.Title,
            //     Description = post.Description,
            //     Id = post.Id,
            //     IsCollected = post.IsCollected,
            //     Created = post.Created
            // };

            if (post is null) return NotFound();

            var postDto = _mapper.Map<PostDto>(post);

            return Ok(postDto);
        }

        [HttpGet("get-all-posts/{userId}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPostsForUserByUserId(int userId)
        {
            // write code that verifies that UserExists. (The UserExists function is initialized in AccountController which must be moved to UserRepository to access it from any where).

            if (User.GetUserId() <= 0) return NotFound();

            var posts = await _postRepository.GetAllPostsForUserByUserId(userId: userId);

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpGet("get-posts/dates")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsBetweenDates(DateTime from, DateTime to)
        {
            if (User.GetUserId() <= 0) return BadRequest("Bad Request");

            var posts = await _postRepository.GetPostsBtwDates(fromDate: from, toDate: to);

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpGet("get-posts/not-collected")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetNotCollectedPosts()
        {
            if (User.GetUserId() <= 0) return BadRequest("Bad Request");

            var posts = await _postRepository.GetNotCollectedPosts();

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpPut]
        public async Task<ActionResult> UpdatePost(PostDto postDto)
        {
            var post = await _postRepository.GetPost(postId: postDto.Id);

            if (post == null) return NotFound();

            _mapper.Map(postDto, post);

            if (await _postRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update post");
        }
    }
}
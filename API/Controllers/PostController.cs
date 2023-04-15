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
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _uow;

        public PostController(IUnitOfWork uow, IMapper mapper, IEmailService emailService)
        {
            _uow = uow;
            _emailService = emailService;
            _mapper = mapper;
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

            await _uow.PostRepository.AddPost(post);

            var user = await _uow.UserRepository.GetUserByIdAsync(id: postDto.AppUserId);

            if (!string.IsNullOrEmpty(user.Email))
            {
                _emailService.SendEmail(
                    senderEmail: user.Email,
                    senderName: user.FirstName,
                    subject: postDto.Title
                ).Wait();
            }

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to add post");
        }

        [HttpGet("get-post/{postId}")]
        public async Task<ActionResult<PostDto>> GetPost(int postId)
        {
            if (postId <= 0) return BadRequest("Cannot find post with no or zero id");

            if (!(await _uow.PostRepository.PostExists(postId: postId))) return NotFound();

            var post = await _uow.PostRepository.GetPost(postId: postId);

            if (post is null) return NotFound();

            var postDto = _mapper.Map<PostDto>(post);

            return Ok(postDto);
        }

        [HttpGet("get-all-posts/{userId}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPostsForUserByUserId(int userId)
        {
            // write code that verifies that UserExists. (The UserExists function is initialized in AccountController which must be moved to UserRepository to access it from any where).

            if (User.GetUserId() <= 0) return NotFound();

            var posts = await _uow.PostRepository.GetAllPostsForUserByUserId(userId: userId);

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpGet("get-posts/dates")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsBetweenDates(DateTime from, DateTime to)
        {
            if (User.GetUserId() <= 0) return BadRequest("Bad Request");

            var posts = await _uow.PostRepository.GetPostsBtwDates(fromDate: from, toDate: to);

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpGet("get-posts/not-collected")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetNotCollectedPosts()
        {
            if (User.GetUserId() <= 0) return BadRequest("Bad Request");

            var posts = await _uow.PostRepository.GetNotCollectedPosts();

            if (posts is null) return NotFound();

            var postDto = _mapper.Map<List<PostDto>>(posts);

            return Ok(postDto);
        }

        [HttpPut]
        public async Task<ActionResult> CollectPost(PostDto postDto)
        {
            var post = await _uow.PostRepository.GetPost(postId: postDto.Id);

            if (post == null) return NotFound();

            _mapper.Map(postDto, post);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to update post");
        }
        [HttpDelete("delete-post/{postId}")]
        public async Task<ActionResult> DeletePost(int postId)
        {
            var post = await _uow.PostRepository.GetPost(postId: postId);

            if (post == null) return NotFound();

            if (post.IsDeleted == true) return BadRequest("Post already deleted!");

            post.IsDeleted = true;

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Failed to delete post");
        }
    }
}
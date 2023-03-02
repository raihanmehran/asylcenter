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
        public PostController(IPostRepository postRepository, IMapper mapper)
        {
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

            var postDto = new PostDto
            {
                Title = post.Title,
                Description = post.Description,
                Id = post.Id,
                IsCollected = post.IsCollected,
                Created = post.Created
            };

            return Ok(postDto);
        }
    }
}
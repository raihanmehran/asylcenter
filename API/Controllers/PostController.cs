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
        public async Task<IActionResult> AddPost(PostDto postDto)
        {
            // var addedByUserId = User.GetUserId();
            // var user = await _userRepository.GetUserByIdAsync(id: userId);

            // if (user == null) return NotFound();

            // user.Posts.Add(post);

            // if()
            if (postDto.AppUserId == null) return NotFound();

            postDto.AddedBy = User.GetUserId();

            if (postDto.AddedBy == null) return NotFound();

            var user = await _userRepository.GetUserByIdAsync(postDto.AppUserId);

            if (user == null) return NotFound();

            var post = _mapper.Map<Post>(postDto);

            user.Posts.Add(post);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add post");

        }
    }
}
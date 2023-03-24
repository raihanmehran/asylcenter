using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Authorize]
    public class EventController : BaseApiController
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPhotoService _photoService;

        public EventController(IEventRepository eventRepository, IMapper mapper, IUserRepository userRepository, IPhotoService photoService)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _photoService = photoService;
            _eventRepository = eventRepository;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddEvent()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if (user == null) return NotFound();

            var photo = Request.Form.Files[0];

            var eventDto = new EventDto
            {
                Title = Request.Form["title"].ToString(),
                Content = Request.Form["content"].ToString(),
                Date = DateOnly.Parse(Request.Form["date"].ToString()),
                Location = Request.Form["location"].ToString(),
            };

            var time = Request.Form["time"].ToString();

            if (time != "")
            {
                eventDto.Time = TimeOnly.Parse(Request.Form["time"].ToString());
            }

            var events = _mapper.Map<Event>(eventDto);
            events.AddedBy = user.Id;
            events.Created = DateTime.Now;

            if (photo is not null)
            {
                var result = await _photoService
                    .AddPhotoAsync(file: photo, storageFolder: "hviding-events");

                if (result.Error != null) return BadRequest(result.Error.Message);

                events.PhotoUrl = result.SecureUrl.AbsoluteUri;
                events.PublicId = result.PublicId;
            }

            await _eventRepository.AddEvent(events: events);

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Problem happened in adding event");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            var user = await _userRepository.GetUserByIdAsync(id: User.GetUserId());

            if (user is null) return BadRequest("It was bad request");

            var result = await _eventRepository.GetEvents();

            if (result == null) return NotFound();

            var events = _mapper.Map<List<EventDto>>(result);

            return Ok(events);
        }

        [HttpGet("get-like-feedback/{eventId}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetLikedFeedbackUsers(int eventId)
        {
            var likedUsers = await _eventRepository
                .GetLikedFeedbackUsers(eventId: eventId);

            if (likedUsers == null) return NotFound();

            return Ok(likedUsers);
        }

        [HttpGet("get-interest-feedback/{eventId}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetInterestedFeedbackUsers(int eventId)
        {
            var interestedUsers = await _eventRepository
                .GetInterestedFeedbackUsers(eventId: eventId);

            if (interestedUsers == null) return NotFound();

            return Ok(interestedUsers);
        }

        [HttpGet("get-comment-feedback/{eventId}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetCommentedFeedbackUsers(int eventId)
        {
            var commentedUsers = await _eventRepository
                .GetCommentedFeedbackUsers(eventId: eventId);

            if (commentedUsers == null) return NotFound();

            return Ok(commentedUsers);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvent(EventDto eventDto)
        {
            var events = await _eventRepository.GetEvent(eventId: eventDto.Id);

            if (events == null) return NotFound();

            events.Title = eventDto.Title;
            events.Content = eventDto.Content;
            events.Date = eventDto.Date;
            events.Time = eventDto.Time;
            events.Location = eventDto.Location;

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Something bad happened while updating event!");
        }

        [HttpDelete("delete-event/{eventId}")]
        public async Task<ActionResult> DeleteEvent(int eventId)
        {
            var events = await _eventRepository.GetEvent(eventId: eventId);

            if (events == null) return NotFound();

            events.IsDeleted = true;

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Something bad happened while deleting event!");
        }
    }
}
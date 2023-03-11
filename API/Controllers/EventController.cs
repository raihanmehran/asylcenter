using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
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

        [HttpPost("add-event")]
        public async Task<ActionResult> AddEvent([FromForm] IFormFile photo, [FromForm] string eventObject)
        {
            var user = await _userRepository.GetUserByIdAsync(id: User.GetUserId());

            if (user is null) return BadRequest("It was a bad request");

            var eventDto = JsonConvert.DeserializeObject<EventDto>(eventObject);

            var events = _mapper.Map<Event>(eventDto);
            events.AddedBy = user.Id;

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

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            var user = await _userRepository.GetUserByIdAsync(id: User.GetUserId());

            if (user is null) return BadRequest("It was bad request");

            var result = await _eventRepository.GetEvents();

            if (result == null) return NotFound();

            var events = _mapper.Map<List<EventDto>>(result);

            return Ok(events);
        }
    }
}
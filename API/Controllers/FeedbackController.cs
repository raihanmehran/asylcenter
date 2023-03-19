using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedbackController : BaseApiController
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public FeedbackController(IFeedbackRepository feedbackRepository, IEventRepository eventRepository, IMapper mapper)
        {
            _mapper = mapper;
            _eventRepository = eventRepository;
            _feedbackRepository = feedbackRepository;
        }

        [HttpPost("add-feedback")]
        public async Task<ActionResult> AddFeedback(EventFeedbackDto eventFeedbackDto)
        {
            var events = await _eventRepository.GetEvent(eventId: eventFeedbackDto.EventId);

            if (events == null) return NotFound();

            var eventFeedback = _mapper.Map<EventFeedback>(eventFeedbackDto);

            events.EventFeedback.Add(eventFeedback);

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Problem happend in adding feedback");

        }
    }
}
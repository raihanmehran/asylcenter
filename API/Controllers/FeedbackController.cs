using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedbackController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public FeedbackController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost("add-feedback")]
        public async Task<ActionResult> AddFeedback(EventFeedbackDto eventFeedbackDto)
        {
            var events = await _uow.EventRepository.GetEvent(eventId: eventFeedbackDto.EventId);

            if (events == null) return NotFound();

            var eventFeedback = _mapper.Map<EventFeedback>(eventFeedbackDto);

            events.EventFeedback.Add(eventFeedback);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem happend in adding feedback");
        }

        [HttpDelete("remove-feedback/{feedbackId}")]
        public async Task<ActionResult> RemoveFeedback(int feedbackId)
        {
            var feedback = await _uow.FeedbackRepository.GetEventFeedback(feedbackId: feedbackId);

            if (feedback == null) return NotFound();

            var events = await _uow.EventRepository.GetEvent(eventId: feedback.EventId);

            events.EventFeedback.Remove(feedback);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem happend in removing feedback");
        }

    }
}
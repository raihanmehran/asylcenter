using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public ContactController(IUnitOfWork uow, IEmailService emailService, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<ActionResult> ContactDeveloper(ContactDto contactDto)
        {
            if (contactDto is null) return BadRequest("contact details were not provided!");

            var contact = _mapper.Map<Contact>(contactDto);
            await _emailService.ContactDeveloper(senderEmail: contact.Email, senderName: contact.Name, message: contact.Message);
            await _uow.ContactRepository.ContactDeveloper(contact: contact);

            if (await _uow.Complete()) return Ok(true);

            return BadRequest("Something bad happened while contacting developer!");
        }
    }
}
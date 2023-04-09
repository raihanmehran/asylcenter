
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        private readonly IContactRepository _contactRepository;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        public ContactController(IContactRepository contactRepository, IEmailService emailService, IMapper mapper)
        {
            _mapper = mapper;
            _emailService = emailService;
            _contactRepository = contactRepository;
        }

        [HttpPost]
        public async Task<ActionResult> ContactDeveloper(ContactDto contactDto)
        {
            if (contactDto is null) return BadRequest("contact details were not provided!");

            var contact = _mapper.Map<Contact>(contactDto);
            var response = await _emailService.ContactDeveloper(senderEmail: contact.Email, senderName: contact.Name, message: contact.Message);

            if (response.IsSuccessStatusCode)
            {
                var result = await _contactRepository.ContactDeveloper(contact: contact);
                if (result) return Ok(result);
            }

            return BadRequest("Something bad happened while contacting developer!");
        }



    }
}
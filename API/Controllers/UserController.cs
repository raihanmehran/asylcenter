using asylcenter.Application.DTOs;
using asylcenter.Application.Services.UsersService.Command;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace asylcenter.API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<ResponseMessage>> UserUpdate(UserUpdateDto bodyPayload)
        {
            try
            {
                var result = await _mediator.Send(new UpdateUserCommand { UserUpdateDto = bodyPayload });
                if (result.Data == null || result.Data == "") return BadRequest(result);
                return Ok(result);
            }
            catch(Exception) { throw; }
        }
    }
}

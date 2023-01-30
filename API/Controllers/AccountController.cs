using asylcenter.Application.DTOs;
using asylcenter.Application.Services.AuthService.Command;
using asylcenter.Application.Services.UsersService.Command;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace asylcenter.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ResponseMessage>> Register(RegisterDto bodyPayload)
        {
            try
            {
                var result = await _mediator.Send(new RegisterUserCommand { RegisterDto = bodyPayload });
                if (result.Data == null || result.Data == "") return BadRequest(result);
                return Ok(result);
            }
            catch (Exception) { throw; }
        }

        [HttpPost("auth")]
        public async Task<ActionResult<ResponseMessage>> Login(LoginDto bodyPayload)
        {
            try
            {
                var result = await _mediator.Send(new AuthenticateCommand { User = bodyPayload });
                if (result.Data == null || result.Data == "") return Unauthorized(result);
                return Ok(result);
            }
            catch (Exception) { throw; }
        }

        [HttpGet]
        public ActionResult<ResponseMessage> Get()
        {
            var result = new ResponseMessage();
            result.Message = "Connected";
            return result;
        }
    }
}

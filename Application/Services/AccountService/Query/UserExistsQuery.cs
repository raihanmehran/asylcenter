using asylcenter.Application.DTOs;
using MediatR;

namespace asylcenter.Application.Services.AccountService.Query
{
    public class UserExistsQuery : IRequest<bool>
    {
        public string Username { get; set; }
    }
}

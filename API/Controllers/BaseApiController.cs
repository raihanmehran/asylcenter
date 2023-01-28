using Microsoft.AspNetCore.Mvc;

namespace asylcenter.API.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]  first create LogUserActivity class
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
    }
}

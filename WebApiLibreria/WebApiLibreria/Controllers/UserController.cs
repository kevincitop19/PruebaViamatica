using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;

namespace WebApiLibreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogin _loginRepository;

        public UserController(ILogin loginRepository )
        {
            _loginRepository = loginRepository;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<User>> RegisterUser(User user)
        {
            var response = await _loginRepository.RegisterUser(user);
            return Ok(response);
        }

        [HttpGet]
        public ActionResult<User> GetUser()
        {
            return Ok( _loginRepository.GetUsers() );
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = await _loginRepository.getLogin(username, password);
            if (user == null)
            {
                return Unauthorized(); 
            }
            return Ok(user);
        }



    }
}

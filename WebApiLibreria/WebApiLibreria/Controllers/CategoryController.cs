using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Repository.Login;

namespace WebApiLibreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoria _categoriaRepository;

        public CategoryController(ICategoria categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }


        [HttpGet]
        public ActionResult<Category> GetListCategroias()
        {
            return Ok(_categoriaRepository.ListCategories());
        }
    }
}

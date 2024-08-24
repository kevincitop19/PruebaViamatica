using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Repository.Login;

namespace WebApiLibreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductos _productoCategory;

        public ProductController(IProductos productoCategory)
        {
            _productoCategory = productoCategory;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetByType(int idCategoria)
        {
            var productos = _productoCategory.GetByType(idCategoria);

            if (productos == null || !productos.Any())
            {
                return NotFound();
            }

            return Ok(productos);
        }
    }
}

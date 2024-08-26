using WebApiLibreria.Entities;

namespace WebApiLibreria.Interfaces
{
    public interface IProductos
    {
        IEnumerable<Product> GetByType(int idCategoria);
    }
}

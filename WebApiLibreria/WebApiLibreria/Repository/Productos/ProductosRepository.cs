using Microsoft.EntityFrameworkCore;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Persistencia;

namespace WebApiLibreria.Repository.Productos
{
    public class ProductosRepository : IProductos
    {
        public readonly SalesSystemContext _salesSystem;

        public ProductosRepository(SalesSystemContext salesSystem)
        {
            _salesSystem = salesSystem;
        }

       
        IEnumerable<Product> IProductos.GetByType(int idCategoria)
        {
            return _salesSystem.Products
                       .Where(p => p.CategoryId == idCategoria)
                       .ToList();
        }
    }
}

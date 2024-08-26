using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Persistencia;

namespace WebApiLibreria.Repository.Categoria
{
    public class CategoryRepository : ICategoria
    {
        public readonly SalesSystemContext _salesSystem;

        public CategoryRepository(SalesSystemContext salesSystem )
        {
            _salesSystem = salesSystem;
        }

        public IEnumerable<Category> ListCategories()
        {
            return _salesSystem.Categories.ToList();
        }
    }
}

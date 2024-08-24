using WebApiLibreria.Entities;

namespace WebApiLibreria.Interfaces
{
    public interface ICategoria
    {
        IEnumerable<Category> ListCategories();
        
    }
}

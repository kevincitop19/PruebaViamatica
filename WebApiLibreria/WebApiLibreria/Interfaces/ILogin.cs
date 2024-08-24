using WebApiLibreria.Entities;

namespace WebApiLibreria.Interfaces
{
    public interface ILogin
    {
        Task<User> getLogin(string username , string password);
        Task<User> RegisterUser(User user);

        IEnumerable<User> GetUsers();   
    }
}

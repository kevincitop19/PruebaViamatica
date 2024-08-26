using Microsoft.EntityFrameworkCore;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Persistencia;

namespace WebApiLibreria.Repository.Login
{
    public class LoginRepsitory : ILogin
    {
        public readonly SalesSystemContext _salesSystem;

        public LoginRepsitory(SalesSystemContext salesSystem )
        {
            _salesSystem = salesSystem;
        }
     

        public async Task<User> RegisterUser(User user)
        {
            _salesSystem.Users.Add(user);

            await _salesSystem.SaveChangesAsync();

            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return _salesSystem.Users.ToList();
        }



        public async Task<User> getLogin(string username, string password)
        {
            return await _salesSystem.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.PasswordHash == password);
        }
    }
}

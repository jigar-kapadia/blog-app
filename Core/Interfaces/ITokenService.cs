using Core.Entities;

namespace Core.Interfaces
{
    public interface ITokenService
    {
         string CreateToken(string email, string password);
    }
}
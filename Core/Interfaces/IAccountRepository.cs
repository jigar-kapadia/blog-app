using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> GetAccountById(int accountId);
        Task<Account> GetAccountByEmail(string email);
        Task<Account> CreateAccount(Account account);
    }
}
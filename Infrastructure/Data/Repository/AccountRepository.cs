using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly Infrastructure.Data.AppContext _appContext;
        public AccountRepository(Infrastructure.Data.AppContext appContext)
        {
            _appContext = appContext;

        }

     

        public async Task<Account> CreateAccount(Account account)
        {
            var accoutCreated = await _appContext.Accounts.AddAsync(account);               
            await _appContext.SaveChangesAsync();
            return accoutCreated.Entity;            
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _appContext.Accounts.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<Account> GetAccountById(int accountId)
        {
            return await _appContext.Accounts.FirstOrDefaultAsync(x => x.Id == accountId);
        }
    }
}
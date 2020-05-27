using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class AccountService
    {
        private readonly BookstoreContext context;

        public AccountService(BookstoreContext context)
        {
            this.context = context;
        }

        public Account GetByUsername(string username)
        {
            return context.Accounts.FirstOrDefault(a => a.Username == username);
        }

        public async Task<Account> Create(Account account)
        {
            var entry = await context.Accounts.AddAsync(account);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Account> Update(Account account)
        {
            var entry = context.Accounts.Update(account);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

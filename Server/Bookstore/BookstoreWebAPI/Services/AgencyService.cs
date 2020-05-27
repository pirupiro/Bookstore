using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class AgencyService
    {
        private readonly BookstoreContext context;

        public AgencyService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Agency> Create(Agency agency)
        {
            var entry = await context.Agencies.AddAsync(agency);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Agency> Get(int id)
        {
            var agency = await context.Agencies.FindAsync(id);
            return agency;
        }

        public IEnumerable<Agency> GetMany()
        {
            return context.Agencies.AsEnumerable();
        }

        public async Task<Agency> Update(Agency agency)
        {
            var entry = context.Agencies.Update(agency);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

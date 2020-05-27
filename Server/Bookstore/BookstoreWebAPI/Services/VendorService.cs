using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class VendorService
    {
        private readonly BookstoreContext context;

        public VendorService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Vendor> Create(Vendor vendor)
        {
            var entry = await context.Vendors.AddAsync(vendor);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Vendor> Get(int id)
        {
            var vendor = await context.Vendors.FindAsync(id);
            return vendor;
        }

        public IEnumerable<Vendor> GetMany()
        {
            var vendors = context.Vendors.AsEnumerable();
            return vendors;
        }

        public async Task<Vendor> Update(Vendor vendor)
        {
            var entry = context.Vendors.Update(vendor);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

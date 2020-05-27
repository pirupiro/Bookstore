using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class WarehouseService
    {
        private readonly BookstoreContext context;

        public WarehouseService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Warehouse> Create(Warehouse warehouse)
        {
            var entry = await context.Warehouses.AddAsync(warehouse);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Warehouse> Get(int id)
        {
            var warehouse = await context.Warehouses.FindAsync(id);
            return warehouse;
        }

        public IEnumerable<Warehouse> GetMany()
        {
            return context.Warehouses.AsEnumerable();
        }

        public async Task<Warehouse> Update(Warehouse warehouse)
        {
            var entry = context.Warehouses.Update(warehouse);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

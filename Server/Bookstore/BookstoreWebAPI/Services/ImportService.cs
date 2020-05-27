using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Extensions;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class ImportService
    {
        private readonly BookstoreContext context;

        public ImportService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Import> Create(Import import)
        {
            var entry = await context.Imports.AddAsync(import);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Import> Get(int id)
        {
            var import = await context.Imports.FindAsync(id);
            import.Details = context.ImportDetails.Where(id => id.ImportId == import.Id).ToList();
            return import;
        }

        public PagedResult<Import> GetMany(int page, int pageSize)
        {
            var pagedResult = context.Imports.GetPaged(page, pageSize, true);
            return pagedResult;
        }

        public PagedResult<Import> GetManyInWarehouse(int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.Imports.Where(i => i.WarehouseId == warehouseId).GetPaged(page, pageSize, true);
            return pagedResult;
        }
    }
}

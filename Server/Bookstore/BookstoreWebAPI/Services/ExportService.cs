using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Extensions;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class ExportService
    {
        private readonly BookstoreContext context;

        public ExportService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Export> Create(Export export)
        {
            var entry = await context.Exports.AddAsync(export);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Export> Get(int id)
        {
            var export = await context.Exports.FindAsync(id);
            export.Details = context.ExportDetails.Where(ed => ed.ExportId == export.Id).ToList();
            return export;
        }

        public PagedResult<Export> GetMany(int page, int pageSize)
        {
            var pagedResult = context.Exports.GetPaged(page, pageSize, true);
            return pagedResult;
        }

        public PagedResult<Export> GetManyInWarehouse(int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.Exports.Where(i => i.WarehouseId == warehouseId).GetPaged(page, pageSize, true);
            return pagedResult;
        }
    }
}

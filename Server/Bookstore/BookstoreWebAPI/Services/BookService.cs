using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Extensions;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class BookService
    {
        private readonly BookstoreContext context;

        public BookService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Book> Create(Book book)
        {
            var entry = await context.Books.AddAsync(book);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<object> Get(int id)
        {
            var book = await context.Books.FindAsync(id);
            if (book == null) return null;

            var warehouseInv = context.WarehouseItems
                .Where(wi => wi.ItemId == id)
                .Join(context.Warehouses,
                    wi => wi.WarehouseId,
                    w => w.Id,
                    (wi, w) => new
                    {
                        wi.Quantity,
                        w.Name,
                        w.Address,
                        w.Phone
                    });

            var agencyInv = context.AgencyItems
                .Where(ai => ai.ItemId == id)
                .Join(context.Agencies,
                    ai => ai.AgencyId,
                    a => a.Id,
                    (ai, a) => new
                    {
                        ai.Quantity,
                        a.Name,
                        a.Address,
                        a.Phone
                    });

            var Inventories = warehouseInv.Concat(agencyInv).ToList();
            var Quantity = Inventories.Sum(i => i.Quantity);

            var otherInfo = new
            {
                book.Id,
                book.Name,
                book.Price,
                book.ImageUri,
                book.Author,
                book.Category,
                book.Publisher,
                Quantity,
                Inventories
            };

            return otherInfo;
        }

        public async Task<object> GetInAgency(int id, int agencyId)
        {
            var book = await context.Books.FindAsync(id);
            if (book == null) return null;

            var agencyItem = context.AgencyItems.FirstOrDefault(ai => ai.ItemId == id && ai.AgencyId == agencyId);
            if (agencyItem == null) return null;

            var Inventories = context.WarehouseItems
                .Where(wi => wi.ItemId == id)
                .Join(context.Warehouses,
                    wi => wi.WarehouseId,
                    w => w.Id,
                    (wi, w) => new
                    {
                        wi.Quantity,
                        w.Name,
                        w.Address,
                        w.Phone
                    })
                .ToList();

            var bookInfo = new
            {
                book.Id,
                book.Name,
                book.Price,
                book.ImageUri,
                book.Author,
                book.Category,
                book.Publisher,
                agencyItem.Quantity,
                Inventories
            };

            return bookInfo;
        }

        public async Task<object> GetInWarehouse(int id, int warehouseId)
        {
            var book = await context.Books.FindAsync(id);
            if (book == null) return null;

            var warehouseItem = context.WarehouseItems.FirstOrDefault(wi => wi.ItemId == id && wi.WarehouseId == warehouseId);
            if (warehouseItem == null) return null;

            var Inventories = context.AgencyItems
                .Where(ai => ai.ItemId == id)
                .Join(context.Agencies,
                    ai => ai.AgencyId,
                    a => a.Id,
                    (ai, a) => new
                    {
                        ai.Quantity,
                        a.Name,
                        a.Address,
                        a.Phone
                    })
                .ToList();

            var bookInfo = new
            {
                book.Id,
                book.Name,
                book.Price,
                book.ImageUri,
                book.Author,
                book.Category,
                book.Publisher,
                warehouseItem.Quantity,
                Inventories
            };

            return bookInfo;
        }

        public PagedResult<Book> GetMany(int page, int pageSize)
        {
            var pagedResult = context.Books.GetPaged(page, pageSize);
            return pagedResult;
        }

        public PagedResult<Book> GetManyInAgency(int page, int pageSize, int agencyId)
        {
            var pagedResult = context.AgencyItems
                .Where(ai => ai.AgencyId == agencyId)
                .Join(context.Books,
                    ai => ai.ItemId,
                    b => b.Id,
                    (ai, b) => b)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Book> GetManyInWarehouse(int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.WarehouseItems
                .Where(wi => wi.WarehouseId == warehouseId)
                .Join(context.Books,
                    wi => wi.ItemId,
                    b => b.Id,
                    (wi, b) => b)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Book> GetManyByName(string name, int page, int pageSize)
        {
            var pagedResult = context.Books.Where(b => b.Name.ToLower().Contains(name.ToLower()))
                                           .GetPaged(page, pageSize);
            return pagedResult;
        }

        public PagedResult<Book> GetManyInAgencyByName(string name, int page, int pageSize, int agencyId)
        {
            var pagedResult = context.AgencyItems
                .Where(ai => ai.AgencyId == agencyId)
                .Join(context.Books.Where(b => b.Name.ToLower().Contains(name.ToLower())),
                    ai => ai.ItemId,
                    b => b.Id,
                    (ai, b) => b)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Book> GetManyInWarehouseByName(string name, int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.WarehouseItems
                .Where(wi => wi.WarehouseId == warehouseId)
                .Join(context.Books.Where(b => b.Name.ToLower().Contains(name.ToLower())),
                    wi => wi.ItemId,
                    b => b.Id,
                    (wi, b) => b)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public async Task<Book> Update(Book book)
        {
            var entry = context.Books.Update(book);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

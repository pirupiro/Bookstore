using System;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Extensions;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class OtherService
    {
        private readonly BookstoreContext context;

        public OtherService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Other> Create(Other other)
        {
            var entry = await context.Others.AddAsync(other);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<object> Get(int id)
        {
            var other = await context.Others.FindAsync(id);
            if (other == null) return null;

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
                other.Id,
                other.Name,
                other.Price,
                other.ImageUri,
                other.Material,
                other.Manufacturer,
                Quantity,
                Inventories
            };

            return otherInfo;
        }

        public async Task<object> GetInAgency(int id, int agencyId)
        {
            var other = await context.Others.FindAsync(id);
            if (other == null) return null;

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

            var otherInfo = new
            {
                other.Id,
                other.Name,
                other.Price,
                other.ImageUri,
                other.Material,
                other.Manufacturer,
                agencyItem.Quantity,
                Inventories
            };

            return otherInfo;
        }

        public async Task<object> GetInWarehouse(int id, int warehouseId)
        {
            var other = await context.Others.FindAsync(id);
            if (other == null) return null;

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

            var otherInfo = new
            {
                other.Id,
                other.Name,
                other.Price,
                other.ImageUri,
                other.Material,
                other.Manufacturer,
                warehouseItem.Quantity,
                Inventories
            };

            return otherInfo;
        }

        public PagedResult<Other> GetMany(int page, int pageSize)
        {
            var pagedResult = context.Others.GetPaged(page, pageSize);
            return pagedResult;
        }

        public PagedResult<Other> GetManyInAgency(int page, int pageSize, int agencyId)
        {

            var pagedResult = context.AgencyItems
                .Where(ai => ai.AgencyId == agencyId)
                .Join(context.Others,
                      ai => ai.ItemId,
                      o => o.Id,
                      (ai, o) => o)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Other> GetManyInWarehouse(int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.WarehouseItems
                .Where(wi => wi.WarehouseId == warehouseId)
                .Join(context.Others,
                      wi => wi.ItemId,
                      o => o.Id,
                      (wi, o) => o)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Other> GetManyByName(string name, int page, int pageSize)
        {
            var pagedResult = context.Others.Where(o => o.Name.ToLower().Contains(name.ToLower()))
                                            .GetPaged(page, pageSize);
            return pagedResult;
        }

        public PagedResult<Other> GetManyInAgencyByName(string name, int page, int pageSize, int agencyId)
        {
            var pagedResult = context.AgencyItems
                .Where(ai => ai.AgencyId == agencyId)
                .Join(context.Others.Where(o => o.Name.ToLower().Contains(name.ToLower())),
                    ai => ai.ItemId,
                    o => o.Id,
                    (ai, o) => o)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public PagedResult<Other> GetManyInWarehouseByName(string name, int page, int pageSize, int warehouseId)
        {
            var pagedResult = context.WarehouseItems
                .Where(wi => wi.WarehouseId == warehouseId)
                .Join(context.Others.Where(o => o.Name.ToLower().Contains(name.ToLower())),
                    wi => wi.ItemId,
                    o => o.Id,
                    (wi, o) => o)
                .GetPaged(page, pageSize);

            return pagedResult;
        }

        public async Task<Other> Update(Other other)
        {
            var entry = context.Others.Update(other);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

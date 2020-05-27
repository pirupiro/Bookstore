using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Extensions;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class OrderService
    {
        private readonly BookstoreContext context;

        public OrderService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Order> Create(Order order)
        {
            var entry = await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Order> Get(int id)
        {
            var order = await context.Orders.FindAsync(id);
            order.Details = context.OrderDetails.Where(od => od.OrderId == order.Id).ToList();
            return order;
        }

        public PagedResult<Order> GetMany(int page, int pageSize)
        {
            var pagedResult = context.Orders.GetPaged(page, pageSize, true);
            return pagedResult;
        }

        public PagedResult<Order> GetManyByAgencyId(int page, int pageSize, int agencyId)
        {
            var pagedResult = context.Orders.Where(o => o.AgencyId == agencyId).GetPaged(page, pageSize);
            return pagedResult;
        }
    }
}

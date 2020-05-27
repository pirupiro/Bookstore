using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;

namespace BookstoreWebAPI.Services
{
    public class EmployeeService
    {
        private readonly BookstoreContext context;

        public EmployeeService(BookstoreContext context)
        {
            this.context = context;
        }

        public async Task<Employee> Create(Employee employee)
        {
            var entry = await context.Employees.AddAsync(employee);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<Employee> Get(int id)
        {
            var employee = await context.Employees.FindAsync(id);
            return employee;
        }

        public IEnumerable<Employee> GetMany()
        {
            var employees = context.Employees.AsEnumerable();
            return employees;
        }

        public IEnumerable<Employee> GetManyInAgency(int agencyId)
        {
            var employees = context.Employees.Where(e => e.AgencyId == agencyId).AsEnumerable();
            return employees;
        }

        public IEnumerable<Employee> GetManyInWarehouse(int warehouseId)
        {
            var employees = context.Employees.Where(e => e.WarehouseId == warehouseId).AsEnumerable();
            return employees;
        }

        public async Task<Employee> Update(Employee employee)
        {
            var entry = context.Employees.Update(employee);
            await context.SaveChangesAsync();
            return entry.Entity;
        }
    }
}

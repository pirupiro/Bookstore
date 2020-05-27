using Microsoft.EntityFrameworkCore;

namespace BookstoreWebAPI.Models
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImportDetail>().HasKey(id => new
            {
                id.ImportId,
                id.ItemId
            });

            modelBuilder.Entity<ExportDetail>().HasKey(ed => new
            {
                ed.ExportId,
                ed.ItemId
            });

            modelBuilder.Entity<OrderDetail>().HasKey(od => new
            {
                od.OrderId,
                od.ItemId
            });

            modelBuilder.Entity<WarehouseItem>().HasKey(wi => new
            {
                wi.WarehouseId,
                wi.ItemId
            });

            modelBuilder.Entity<AgencyItem>().HasKey(ai => new
            {
                ai.AgencyId,
                ai.ItemId
            });

            modelBuilder.Entity<Item>().ToTable("Items");
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Agency> Agencies { get; set; }
        public DbSet<AgencyItem> AgencyItems { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Export> Exports { get; set; }
        public DbSet<ExportDetail> ExportDetails { get; set; }
        public DbSet<Import> Imports { get; set; }
        public DbSet<ImportDetail> ImportDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Other> Others { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<WarehouseItem> WarehouseItems { get; set; }
    }
}

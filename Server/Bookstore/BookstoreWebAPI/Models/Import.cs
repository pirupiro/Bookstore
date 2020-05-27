using System;
using System.Collections.Generic;

namespace BookstoreWebAPI.Models
{
    public class Import
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int TotalPrice { get; set; }
        public IList<ImportDetail> Details { get; set; }
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int VendorId { get; set; }
        public Vendor Vendor { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}

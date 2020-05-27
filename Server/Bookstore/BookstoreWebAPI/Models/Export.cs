using System;
using System.Collections.Generic;

namespace BookstoreWebAPI.Models
{
    public class Export
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public IList<ExportDetail> Details { get; set; }
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int AgencyId { get; set; }
        public Agency Agency { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}

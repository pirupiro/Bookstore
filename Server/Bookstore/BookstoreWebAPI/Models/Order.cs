using System;
using System.Collections.Generic;

namespace BookstoreWebAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int TotalPrice { get; set; }
        public IList<OrderDetail> Details { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int AgencyId { get; set; }
        public Agency Agency { get; set; }
    }
}

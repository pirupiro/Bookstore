using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreWebAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Column(TypeName="date")]
        public DateTime Birthdate { get; set; }
        [Required]
        [Column(TypeName="varchar(15)")]
        public string Identity { get; set; }
        [Required]
        [MaxLength(300)]
        public string Address { get; set; }
        [Required]
        [Column(TypeName="varchar(15)")]
        public string Phone { get; set; }
        [Column(TypeName="date")]
        public DateTime WorkFrom { get; set; }
        [Required]
        [MaxLength(20)]
        public string Role { get; set; }
        public int Salary { get; set; }
        public Account Account { get; set; }
        public int? AgencyId { get; set; }
        public Agency Agency { get; set; }
        public int? WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }

        public bool IsAdmin()
        {
            return this.Role.ToLower() == "admin";
        }
    }
}

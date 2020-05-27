using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreWebAPI.Models
{
    public class Account
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName="varchar(32)")]
        public string Username { get; set; }
        [Required]
        [Column(TypeName="varchar(32)")]
        public string Password { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}

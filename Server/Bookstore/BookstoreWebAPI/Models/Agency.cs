using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreWebAPI.Models
{
    public class Agency
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(300)]
        public string Address { get; set; }
        [Required]
        [Column(TypeName="varchar(15)")]
        public string Phone { get; set; }
    }
}

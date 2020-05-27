using System.ComponentModel.DataAnnotations;

namespace BookstoreWebAPI.Models
{
    public class Other : Item
    {
        [MaxLength(50)]
        public string Material { get; set; }
        [MaxLength(100)]
        public string Manufacturer { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace BookstoreWebAPI.Models
{
    public class Book : Item
    {
        [MaxLength(100)]
        public string Author { get; set; }
        [MaxLength(50)]
        public string Category { get; set; }
        [MaxLength(200)]
        public string Publisher { get; set; }
    }
}

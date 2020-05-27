using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace BookstoreWebAPI.Models
{
    public abstract class Item
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public int Price { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string ImageUri { get; set; }
        [NotMapped]
        [JsonIgnore]
        public IFormFile File { get; set; }
    }
}

namespace BookstoreWebAPI.Models
{
    public class ImportDetail
    {
        public int ImportId { get; set; }
        public Import Import { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}

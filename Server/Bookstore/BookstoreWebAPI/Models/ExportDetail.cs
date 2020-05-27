namespace BookstoreWebAPI.Models
{
    public class ExportDetail
    {
        public int ExportId { get; set; }
        public Export Export { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
    }
}

namespace BookstoreWebAPI.Models
{
    public class AgencyItem
    {
        public int AgencyId { get; set; }
        public Agency Agency { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
    }
}

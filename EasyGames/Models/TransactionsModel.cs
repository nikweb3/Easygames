namespace EasyGames.Models
{
    public class TransactionsModel
    {
        public long TransactionID { get; set; }
        public decimal Amount { get; set; }
        public short TransactionTypeID { get; set; }
        public int ClientID { get; set; }
        public string Comment { get; set; }
    }
}

using Dapper;
using EasyGames.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace EasyGames.Controllers
{
    public class ClientController : Controller
    {
        private readonly IConfiguration _config;

        public async Task<IActionResult> Index()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            var clientIds = await connection.QueryAsync<int>("SELECT ClientId FROM Client");

            foreach (var clientId in clientIds)
            {
                await connection.ExecuteAsync("UpdateClientBalance", new { ClientId = clientId }, commandType: CommandType.StoredProcedure);
            }

            var clients = await connection.QueryAsync<ClientModel>("SELECT * FROM Client");
            return View(clients);
        }

        public ClientController(IConfiguration config)
        {
            _config = config;
        }


        public async Task<IActionResult> Transactions(int clientId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var transactions = await connection.QueryAsync<TransactionsModel>(
                "SELECT * FROM Transactions WHERE ClientID = @ClientId", new { ClientId = clientId });
            return View("Transactionview", transactions);
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction(TransactionsModel transaction)
        {

            try
            {
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

                var count = await connection.QueryFirstOrDefaultAsync<int>("SELECT COUNT(*) FROM Transactions");

                transaction.TransactionID = count + 1;

                await connection.ExecuteAsync("INSERT INTO Transactions (TransactionID, Amount, TransactionTypeID, ClientID, Comment) VALUES (@TransactionID, @Amount, @TransactionTypeID, @ClientID, @Comment)", transaction);
                
            }
            catch(Exception ex)
            {
                return StatusCode(500, "An error occurred while adding the transaction.");
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTransaction(string comment, int transactionID)
        {
            var connectionString = _config.GetConnectionString("DefaultConnection");
            using (var connection = new SqlConnection(connectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    "UPDATE Transactions SET Comment = @Comment WHERE TransactionID = @TransactionID",
                    new { Comment = comment, TransactionID = transactionID });

                if (rowsAffected == 1)
                {
                    return Ok();
                }
                else
                {
                    return View("Error");
                }
            }
        }

    }
}

using System;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService accServ;
        private readonly EmployeeService empServ;

        public AccountController(AccountService accServ, EmployeeService empServ)
        {
            this.accServ = accServ;
            this.empServ = empServ;
        }

        [HttpPost("account")]
        public async Task<IActionResult> Create([FromBody] Account account)
        {
            try
            {
                var acc = accServ.GetByUsername(account.Username);

                if (acc != null) return BadRequest("Account already existed");

                var createdAccount = await accServ.Create(account);
                return Ok(createdAccount);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Account account)
        {
            try
            {
                var returnAccount = accServ.GetByUsername(account.Username);

                if (returnAccount == null) return BadRequest("Wrong username");
                if (returnAccount.Password != account.Password) return BadRequest("Wrong password");

                var employee = await empServ.Get(returnAccount.EmployeeId);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("account/{id}")]
        public async Task<Account> Update(Account account)
        {
            var updatedAccount = await accServ.Update(account);
            return updatedAccount;
        }
    }
}

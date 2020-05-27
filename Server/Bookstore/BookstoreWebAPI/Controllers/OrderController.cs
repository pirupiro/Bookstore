using System;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService orderServ;

        public OrderController(OrderService orderServ)
        {
            this.orderServ = orderServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Order order)
        {
            try
            {
                order.TotalPrice = order.Details.Sum(detail => detail.Price * detail.Quantity);
                order.Time = DateTime.Now;
                var createdOrder = await orderServ.Create(order);
                return Ok(createdOrder);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        public IActionResult GetMany([FromHeader] string sender,
                                     int? page,
                                     int? pageSize,
                                     int? agencyId)
        {
            try
            {
                if (page == null || pageSize == null) return BadRequest("'page' and 'pageSize' parameters are required");
                if (page < 1 || pageSize < 1) return BadRequest("Parameters must be positive");
                if (sender == null) return Unauthorized();

                object pagedResult = null;
                Employee user = JsonConvert.DeserializeObject<Employee>(sender);

                if (agencyId != null)
                {
                    if (user.IsAdmin() || user.AgencyId == agencyId.Value)
                        pagedResult = orderServ.GetManyByAgencyId(page.Value, pageSize.Value,agencyId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = orderServ.GetMany(page.Value, pageSize.Value);
                }

                if (pagedResult == null)
                    return Unauthorized();
                else
                    return Ok(pagedResult);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var order = await orderServ.Get(id);

                if (order == null)
                    return NotFound();
                else
                    return Ok(order);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

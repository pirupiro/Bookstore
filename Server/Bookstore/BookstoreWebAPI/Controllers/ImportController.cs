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
    public class ImportController : ControllerBase
    {
        private readonly ImportService impServ;

        public ImportController(ImportService impServ)
        {
            this.impServ = impServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Import import)
        {
            try
            {
                import.TotalPrice = import.Details.Sum(detail => detail.Price * detail.Quantity);
                import.Time = DateTime.Now;
                var createdImport = await impServ.Create(import);
                return Ok(createdImport);
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
                                     int? warehouseId)
        {
            try
            {
                if (page == null || pageSize == null) return BadRequest("'page' and 'pageSize' parameters are required");
                if (page < 1 || pageSize < 1) return BadRequest("Parameters must be positive");
                if (sender == null) return Unauthorized();

                object pagedResult = null;
                Employee user = JsonConvert.DeserializeObject<Employee>(sender);

                if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        pagedResult = impServ.GetManyInWarehouse(page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = impServ.GetMany(page.Value, pageSize.Value);
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
        public async Task<IActionResult> Get([FromHeader] string sender, int id)
        {
            try
            {
                if (sender == null) return Unauthorized();

                Employee user = JsonConvert.DeserializeObject<Employee>(sender);
                var import = await impServ.Get(id);

                if (!user.IsAdmin() && user.WarehouseId != import.WarehouseId)
                    return Unauthorized();

                if (import == null)
                    return NotFound();
                else
                    return Ok(import);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

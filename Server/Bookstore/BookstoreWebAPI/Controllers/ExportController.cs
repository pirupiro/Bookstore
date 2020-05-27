using System;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly ExportService expServ;

        public ExportController(ExportService expServ)
        {
            this.expServ = expServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Export export)
        {
            try
            {
                export.Time = DateTime.Now;
                var createdExport = await expServ.Create(export);
                return Ok(createdExport);
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
                        pagedResult = expServ.GetManyInWarehouse(page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = expServ.GetMany(page.Value, pageSize.Value);
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
                var export = await expServ.Get(id);

                if (!user.IsAdmin() && user.WarehouseId != export.WarehouseId)
                    return Unauthorized();

                if (export == null)
                    return NotFound();
                else
                    return Ok(export);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

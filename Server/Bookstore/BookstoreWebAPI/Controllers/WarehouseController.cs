using System;
using System.Linq;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehouseController : ControllerBase
    {
        private readonly WarehouseService wahoServ;

        public WarehouseController(WarehouseService wahoServ)
        {
            this.wahoServ = wahoServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Warehouse warehouse)
        {
            try
            {
                var createdWarehouse = await wahoServ.Create(warehouse);
                return Ok(createdWarehouse);
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
                var warehouse = await wahoServ.Get(id);

                if (warehouse == null)
                    return NotFound();
                else
                    return Ok(warehouse);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        public IActionResult GetMany()
        {
            try
            {
                var agenices = wahoServ.GetMany();
                return Ok(agenices);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Warehouse warehouse)
        {
            try
            {
                var updatedWarehouse = await wahoServ.Update(warehouse);
                return Ok(updatedWarehouse);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

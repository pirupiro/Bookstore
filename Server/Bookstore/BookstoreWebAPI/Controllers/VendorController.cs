using System;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly VendorService vendorServ;

        public VendorController(VendorService vendorServ)
        {
            this.vendorServ = vendorServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Vendor vendor)
        {
            try
            {
                var createdVendor = await vendorServ.Create(vendor);
                return Ok(createdVendor);
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
                var vendor = await vendorServ.Get(id);

                if (vendor == null)
                    return NotFound();
                else
                    return Ok(vendor);
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
                var vendors = vendorServ.GetMany();
                return Ok(vendors);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Vendor vendor)
        {
            try
            {
                var updatedVendor = await vendorServ.Update(vendor);
                return Ok(updatedVendor);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

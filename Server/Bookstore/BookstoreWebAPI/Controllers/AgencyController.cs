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
    public class AgencyController : ControllerBase
    {
        private readonly AgencyService agencyServ;

        public AgencyController(AgencyService agencyServ)
        {
            this.agencyServ = agencyServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Agency agency)
        {
            try
            {
                var createdAgency = await agencyServ.Create(agency);
                return Ok(createdAgency);
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
                var agency = await agencyServ.Get(id);

                if (agency == null)
                    return NotFound();
                else
                    return Ok(agency);
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
                var agenices = agencyServ.GetMany();
                return Ok(agenices);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Agency agency)
        {
            try
            {
                var updatedAgency = await agencyServ.Update(agency);
                return Ok(updatedAgency);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

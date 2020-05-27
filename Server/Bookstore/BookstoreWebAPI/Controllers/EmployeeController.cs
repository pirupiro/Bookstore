using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Linq;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService empServ;

        public EmployeeController(EmployeeService empServ)
        {
            this.empServ = empServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            try
            {
                var createdEmployee = await empServ.Create(employee);
                return Ok(createdEmployee);
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
                var employee = await empServ.Get(id);

                if (employee != null) return Ok(employee);
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        public IActionResult GetMany([FromQuery] int? agencyId, [FromQuery] int? warehouseId)
        {
            try
            {
                IEnumerable<Employee> employees = null;
                StringValues senders;
                dynamic sender;

                if (Request.Headers.TryGetValue("sender", out senders))
                {
                    sender = JsonConvert.DeserializeObject(senders.FirstOrDefault());

                    if (agencyId != null)
                    {
                        if (sender.role == "Admin" || (sender.role == "Agency Manager" && sender.agencyId == agencyId.Value))
                            employees = empServ.GetManyInAgency(agencyId.Value);
                    }
                    else if (warehouseId != null)
                    {
                        if (sender.role == "Admin" || (sender.role == "Warehouse manager" && sender.warehouseId == warehouseId.Value))
                            employees = empServ.GetManyInWarehouse(warehouseId.Value);
                    }
                    else
                    {
                        if (sender.role == "Admin")
                            employees = empServ.GetMany();
                    }
                }

                if (employees == null)
                    return Unauthorized();
                else
                    return Ok(employees);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Employee employee)
        {
            try
            {
                var updatedEmployee = await empServ.Update(employee);
                return Ok(updatedEmployee);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

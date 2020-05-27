using System;
using System.Collections.Generic;
using System.IO;
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
    public class OtherController : ControllerBase
    {
        private readonly OtherService otherServ;

        public OtherController(OtherService otherServ)
        {
            this.otherServ = otherServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Other other)
        {
            try
            {
                if (other.File == null || other.File.Length <= 0) return BadRequest("Image file is required");

                IList<string> allowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                string extension = other.File.FileName.Substring(other.File.FileName.LastIndexOf('.')).ToLower();

                if (!allowedFileExtensions.Contains(extension)) return BadRequest("Not image file");

                string imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                string now = DateTime.Now.ToString("yyyyMMdd-hhmmss.fff");
                string storedFileName = $"{now}_{other.File.FileName}";

                using (FileStream fileStream = System.IO.File.Create(imageFolderPath + "/" + storedFileName))
                {
                    other.File.CopyTo(fileStream);
                    await fileStream.FlushAsync();
                }

                other.ImageUri = $"images/{storedFileName}";
                var createdOther = await otherServ.Create(other);
                return Ok(createdOther);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("search")]
        public IActionResult GetManyByName([FromHeader] string sender,
                                           string name,
                                           int? page,
                                           int? pageSize,
                                           int? agencyId,
                                           int? warehouseId)
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
                        pagedResult = otherServ.GetManyInAgencyByName(name, page.Value, pageSize.Value, agencyId.Value);
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        pagedResult = otherServ.GetManyInWarehouseByName(name,page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = otherServ.GetManyByName(name, page.Value, pageSize.Value);
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
        public async Task<IActionResult> Get([FromHeader] string sender,
                                             int id,
                                             int? agencyId,
                                             int? warehouseId)
        {
            try
            {
                if (sender == null) return Unauthorized();

                object other = null;
                Employee user = JsonConvert.DeserializeObject<Employee>(sender);

                if (agencyId != null)
                {
                    if (user.IsAdmin() || user.AgencyId == agencyId.Value)
                        other = await otherServ.GetInAgency(id, agencyId.Value);
                    else
                        return Unauthorized();
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        other = await otherServ.GetInWarehouse(id, warehouseId.Value);
                    else
                        return Unauthorized();
                }
                else
                {
                    if (user.IsAdmin())
                        other = await otherServ.Get(id);
                    else
                        return Unauthorized();
                }

                if (other == null)
                    return NotFound();
                else
                    return Ok(other);
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
                                     int? agencyId,
                                     int? warehouseId)
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
                        pagedResult = otherServ.GetManyInAgency(page.Value, pageSize.Value, agencyId.Value);
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        pagedResult = otherServ.GetManyInWarehouse(page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = otherServ.GetMany(page.Value, pageSize.Value);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Other other)
        {
            try
            {
                var updatedOther = await otherServ.Update(other);
                return Ok(updatedOther);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

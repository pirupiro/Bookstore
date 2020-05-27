using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using BookstoreWebAPI.Models;
using BookstoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookstoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService bookServ;

        public BookController(BookService bookServ)
        {
            this.bookServ = bookServ;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Book book)
        {
            try
            {
                if (book.File == null || book.File.Length == 0) return BadRequest("Image file is required");

                IList<string> allowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                string extension = book.File.FileName.Substring(book.File.FileName.LastIndexOf('.')).ToLower();

                if (!allowedFileExtensions.Contains(extension)) return BadRequest("Not image file");

                string imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                string now = DateTime.Now.ToString("yyyyMMdd-hhmmss.fff");
                string storedFileName = $"{now}_{book.File.FileName}";

                using (FileStream fileStream = System.IO.File.Create(imageFolderPath + "/" + storedFileName))
                {
                    book.File.CopyTo(fileStream);
                    await fileStream.FlushAsync();
                }

                book.ImageUri = $"images/{storedFileName}";
                var createdBook = await bookServ.Create(book);
                return Ok(createdBook);
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
                        pagedResult = bookServ.GetManyInAgencyByName(name, page.Value, pageSize.Value, agencyId.Value);
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        pagedResult = bookServ.GetManyInWarehouseByName(name,page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = bookServ.GetManyByName(name, page.Value, pageSize.Value);
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

                object book = null;
                Employee user = JsonConvert.DeserializeObject<Employee>(sender);

                if (agencyId != null)
                {
                    if (user.IsAdmin() || user.AgencyId == agencyId.Value)
                        book = await bookServ.GetInAgency(id, agencyId.Value);
                    else
                        return Unauthorized();
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        book = await bookServ.GetInWarehouse(id, warehouseId.Value);
                    else
                        return Unauthorized();
                }
                else
                {
                    if (user.IsAdmin())
                        book = await bookServ.Get(id);
                    else
                        return Unauthorized();
                }

                if (book == null)
                    return NotFound();
                else
                    return Ok(book);
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
                        pagedResult = bookServ.GetManyInAgency(page.Value, pageSize.Value, agencyId.Value);
                }
                else if (warehouseId != null)
                {
                    if (user.IsAdmin() || user.WarehouseId == warehouseId.Value)
                        pagedResult = bookServ.GetManyInWarehouse(page.Value, pageSize.Value, warehouseId.Value);
                }
                else
                {
                    if (user.IsAdmin())
                        pagedResult = bookServ.GetMany(page.Value, pageSize.Value);
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
        public async Task<IActionResult> Update(Book book)
        {
            try
            {
                var updatedBook = await bookServ.Update(book);
                return Ok(updatedBook);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

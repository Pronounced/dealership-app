using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Fake_Data;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("inventory/cars")]
    public class InventoryController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return Inventory.GetCars();
        }

        [HttpPost]
        public IEnumerable<Car> Post(string year, string make, string model)
        {
            return Inventory.PostCar(year, make, model);
        }
    }
}
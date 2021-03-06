using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Fake_Data;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return Inventory.GetCars();
        }

/*         [HttpPost]
        public IEnumerable<Car> Post(string year, string make, string model)
        {
            return Inventory.PostCar(year, make, model);
        } */

        [HttpPost("addcar")]
        public void Post([FromBody]Car car)
        {
            Inventory.PostCar(car.year,car.make,car.model);
        }
    }
}
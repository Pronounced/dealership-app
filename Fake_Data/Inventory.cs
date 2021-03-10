using System;
using System.Collections.Generic;
using dealership_app.Models;

namespace dealership_app.Fake_Data
{
    class Inventory
    {
        static private List<Car> cars = new List<Car>() {};

        static public List<Car> GetCars()
        {
            if(cars.Count > 0)
            {
                return cars;
            }

            for (int i = 0; i < 5; i++)
            {
                var car = new Car();
                car.year = "2000";
                car.make = "Honda";
                car.model = "Civic";
                car.guid = Guid.NewGuid().ToString();
                car.seller = $"{i}";
                car.isApproved = true;
                cars.Add(car);            
            }
            return cars;
        }

        static public List<Car> PostCar(string year, string make, string model, string seller){
            cars.Add(new Car(){
                guid = Guid.NewGuid().ToString(),
                year = year, 
                make = make, 
                model = model,
                seller = seller,
                isApproved = false
            });

            return cars;
        }


    }
}
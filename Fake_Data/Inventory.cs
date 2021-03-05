using System;
using System.Collections.Generic;
using my_new_app.Models;

namespace my_new_app.Fake_Data
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
                car.Year = "2000";
                car.Make = "Honda";
                car.Model = "Civic";
                car.Guid = Guid.NewGuid().ToString();
                cars.Add(car);            
            }
            return cars;
        }

        static public List<Car> PostCar(string year, string make, string model){
            cars.Add(new Car(){
                Year = year, 
                Make = make, 
                Model = model
            });

            return cars;
        }


    }
}
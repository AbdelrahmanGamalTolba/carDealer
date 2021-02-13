using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Interfaces;
using WevAPI.Model;

namespace WevAPI.Data.Repo
{
    public class CarReopsitory : ICarRepository
    {
        private readonly DataContext dc;
        public CarReopsitory(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCar(Car car)
        {
            dc.cars.AddAsync(car);
        }

        public void Deletecar(int CarId)
        {
            var car = dc.cars.Find(CarId);
            dc.cars.Remove(car);
        }

        public async Task<Car> FindCar(int id)
        {
            return await dc.cars.FindAsync(id);
        }

        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            return await dc.cars.ToListAsync();
        }

   
    }
}

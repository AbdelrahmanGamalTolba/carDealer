using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Model;

namespace WevAPI.Interfaces
{
    public interface ICarRepository
    {
        Task<IEnumerable<Car>> GetCarsAsync();
        void AddCar(Car car);
        void Deletecar(int CarId);
        Task<Car> FindCar(int id);

    }
}

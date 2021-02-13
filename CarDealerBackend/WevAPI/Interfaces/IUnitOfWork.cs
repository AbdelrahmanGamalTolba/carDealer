using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WevAPI.Interfaces
{
   public interface IUnitOfWork
    {
        ICarRepository carRepository { get; }
        IUserRepository userRepository { get; } 
        Task<bool> SaveAsync(); 
    }
}

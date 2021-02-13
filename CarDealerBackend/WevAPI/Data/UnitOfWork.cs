using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Data.Repo;
using WevAPI.Interfaces;

namespace WevAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public ICarRepository carRepository => new CarReopsitory(dc);

        public IUserRepository userRepository => new UserRepository(dc);

        private readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}

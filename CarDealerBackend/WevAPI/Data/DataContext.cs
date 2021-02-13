using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Model;

namespace WevAPI.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Car> cars { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

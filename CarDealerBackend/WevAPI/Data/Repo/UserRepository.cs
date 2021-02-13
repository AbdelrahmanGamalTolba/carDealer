using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Interfaces;
using WevAPI.Model;

namespace WevAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;
        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string UserName, string Password)
        {
            return await dc.Users.FirstOrDefaultAsync(x => x.UserName == UserName && x.Password == Password);
        }
    }
}

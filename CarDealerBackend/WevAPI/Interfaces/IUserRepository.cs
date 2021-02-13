using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Model;

namespace WevAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string UserName, string Password);
    }
}

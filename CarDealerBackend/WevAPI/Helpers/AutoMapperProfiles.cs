using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Dtos;
using WevAPI.Model;

namespace WevAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Car, CarDTO>().ReverseMap();
            CreateMap<Car, CarUpdateDTO>().ReverseMap();

        }
    }
}

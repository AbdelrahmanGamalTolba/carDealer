using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WevAPI.Data;
using WevAPI.Data.Repo;
using WevAPI.Dtos;
using WevAPI.Interfaces;
using WevAPI.Model;

namespace WevAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [Authorize]
    public class CarController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CarController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        // Get api/car
        [HttpGet]
        //[AllowAnonymous]
        public async Task<IActionResult> Getcars()
        {
            var Cars = await uow.carRepository.GetCarsAsync();
            var carsdto = mapper.Map<IEnumerable<CarDTO>>(Cars);
              return Ok(carsdto);
        }

        // Post api/car/add?BrandName=BYD
      
        //[HttpPost("add")]
        //[HttpPost("add/{BrandName}")]
        //public async Task<IActionResult> AddCar(string BrandName)
        //{
        //    Car car = new Car();
        //    car.Brand = BrandName;
        //    await dc.cars.AddAsync(car);
        //    await dc.SaveChangesAsync();
        //    return Ok(car);
        //}
        // Post api/car/add/post Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddCar(CarDTO BrandDTO)
        {
            
            var car = mapper.Map<Car>(BrandDTO);
            car.LastUpdateBy=1;
            car.LastupdateOn = DateTime.Now;

            uow.carRepository.AddCar(car);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        //update
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCar(int id,CarDTO BrandDTO)
        {

                if (id != BrandDTO.id)
                     return BadRequest("Update not allowed");
                var carFromDb = await uow.carRepository.FindCar(id);
                if (carFromDb == null)
                    return BadRequest("Update not allowed");
                carFromDb.LastUpdateBy = 1;
                carFromDb.LastupdateOn = DateTime.Now;
                mapper.Map(BrandDTO, carFromDb);
                throw new Exception("Some unkown error  occured!");
                await uow.SaveAsync();
                return StatusCode(200);
           
        }
        //update
        [HttpPut("updateCarBrand/{id}")]
        public async Task<IActionResult> UpdateCar(int id, CarUpdateDTO BrandDTO)
        {
            var carFromDb = await uow.carRepository.FindCar(id);
            carFromDb.LastUpdateBy = 1;
            carFromDb.LastupdateOn = DateTime.Now;
            mapper.Map(BrandDTO, carFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        //patch
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCarPatch(int id, JsonPatchDocument<Car> BrandToPatch)
        {
            var carFromDb = await uow.carRepository.FindCar(id);
            carFromDb.LastUpdateBy = 1;
            carFromDb.LastupdateOn = DateTime.Now;
            BrandToPatch.ApplyTo(carFromDb,ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        // Delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            uow.carRepository.Deletecar(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}

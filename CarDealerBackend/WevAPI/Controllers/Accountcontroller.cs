using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WevAPI.Dtos;
using WevAPI.Interfaces;
using WevAPI.Model;

namespace WevAPI.Controllers
{
    public class Accountcontroller:BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
        public Accountcontroller(IUnitOfWork uow, IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }
        // api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDTO loginReqDTO)
        {
            var user = await uow.userRepository.Authenticate(loginReqDTO.UserName, loginReqDTO.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            var LoginRes = new LoginResDTO();
            LoginRes.UserName = user.UserName;
            LoginRes.Token = CreateJWT(user);
            return Ok(LoginRes);
        }
        public string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)); var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
            var signingCredentails = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentails
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

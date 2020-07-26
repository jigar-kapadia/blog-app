using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration configuration)
        {
            this._configuration = configuration;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
        }

        public string CreateToken(string email, string password)
        {
            var securityKey = _key;//new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Token:Issuer"],
             _configuration["Token:Issuer"], 
             null, 
             expires: DateTime.Now.AddDays(3), 
             signingCredentials : credentials);
            
            var jwtHandler = new JwtSecurityTokenHandler();
            return jwtHandler.WriteToken(token);
        }
    }
}
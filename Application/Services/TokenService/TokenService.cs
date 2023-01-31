using asylcenter.Application.Interfaces;
using asylcenter.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace asylcenter.Application.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            //_key = new SymmetricSecurityKey(Encoding.UTF8
            //    .GetBytes(config["TokenKey"]));
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

            //var claims = GetClaims(user);
            //var creds = GetCredentials();
            //var tokenDescriptor = GetTokenDescriptor(claims, creds);

            //var tokenHandler = new JwtSecurityTokenHandler();

            //return tokenHandler.WriteToken(
            //    tokenHandler.CreateToken(tokenDescriptor));
        }

        private SecurityTokenDescriptor GetTokenDescriptor(
            List<Claim> claims, 
            SigningCredentials creds)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
        }

        private SigningCredentials GetCredentials()
        {
            return new SigningCredentials(_key, 
                SecurityAlgorithms.HmacSha512Signature);
        }

        public List<Claim> GetClaims(AppUser user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };
        }
    }
}

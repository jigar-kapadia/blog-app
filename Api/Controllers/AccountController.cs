using System;
using System.Threading.Tasks;
using Api.DTO;
using Api.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ITokenService _tokenService;
        public AccountController(IAccountRepository accountRepository, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._accountRepository = accountRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AccountDto>> GetCurrentUser()
        {   
            var accId = Request.Headers["accountid"].ToString();
            var user = await _accountRepository.GetAccountById(Convert.ToInt32(accId));  
            var userDto = new AccountDto
            {
                AccountId = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user.Email, user.Password)
            };
            return Ok(userDto);
        }

        [HttpGet("checkemail")]
        public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
        {
            return Ok(await _accountRepository.GetAccountByEmail(email) != null);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {
            if(await _accountRepository.GetAccountByEmail(registerDto.Email) != null){
                return new BadRequestObjectResult(new ApiValidationErrorResponse{ Errors = new []{ "Email Already in use." }  });
            }
            var user = new Account
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                Password = registerDto.Password, // TODO : Hash Password
                AccountType = 2,
                CreatedDateTime = DateTime.Now,
                LastLoginDateTime = DateTime.Now,
                IsActive = true
            };

            var result = await _accountRepository.CreateAccount(user);
            if (result ==  null) return BadRequest(new ApiResponse(400));
            return Ok(new AccountDto
            {
                AccountId = result.Id,
                Email = result.Email,
                UserName = result.UserName,
                Token = _tokenService.CreateToken(user.Email, user.Password)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _accountRepository.GetAccountByEmail(loginDto.Email);
            if (user == null)
                return Unauthorized(new ApiResponse(401, "Email/Password incorrect."));
            else
            {
                if (user.Password != loginDto.Password)
                {
                    return Unauthorized(new ApiResponse(401, "Email/Password incorrect."));
                }
            }

            var userDto = new AccountDto
            {
                AccountId = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user.Email, user.Password)
            };
            return Ok(userDto);
        }

    }
}
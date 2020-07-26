using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", 
        ErrorMessage = "Password must consist of 1 Uppercase, 1 Lowercase, 1 number, 1 non alphanumeric and atleast 6 characters")]
        public string Password { get; set; }
    }
}
namespace Api.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            this.StatusCode = statusCode;
            this.Message = message ?? GetErrorMessage(statusCode);

        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetErrorMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request, you've made.",
                401 => "You are not authorzied to access the resource",
                404 => "Resource not found",
                500 => "Some Internal Server Error",
                _ => null
            };
        }
    }
}
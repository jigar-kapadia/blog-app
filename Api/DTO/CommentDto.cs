using System;

namespace Api.DTO
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsDeleted {get; set;}
         public string UserName { get; set; }
    }
}
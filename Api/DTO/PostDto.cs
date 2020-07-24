using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class PostDto
    {
        public int PostId { get; set; }
        [Required]
        public int AccountId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public string Username { get; set; }

        public int TotalLikes { get; set; }

        public List<string> LikesList { get; set; }
        //Change from List<string> to List<CommentDto>
        public List<CommentDto> Comments { get; set; }
    }
}
using System;

namespace Api.DTO
{
    public class LikesDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int AccountId { get; set; }
        public string UserName { get; set; }

        public bool IsLiked { get; set; }

        public DateTime CreatedDate { get; set; }

    }
}
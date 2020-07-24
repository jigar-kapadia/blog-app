using System;

namespace Core.Entities
{
    public class Like : BaseEntity
    {
         public Post Post { get; set; }
        public int PostId { get; set; }
         public Account LikedbyAccount { get; set; }
        public int LikedbyAccountId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsLiked { get; set; }
    }
}
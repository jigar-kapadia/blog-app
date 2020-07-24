using System;

namespace Core.Entities
{
    public class Comment : BaseEntity
    {
        public Post Post { get; set; }
        public int PostId { get; set; }
        public Account Account { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsDeleted {get; set;}
    }
}
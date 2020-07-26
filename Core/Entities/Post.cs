using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Post : BaseEntity
    {        
        public Account Account{ get;set; }
        public int AccountId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
         public List<Comment> Comments { get; set; }
         public List<Like> Likes { get; set; }
    }
    //DateTime.Now.ToString("dddd dd MMMM yyyy")
}
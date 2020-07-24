using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Account : BaseEntity
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int AccountType { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime? LastLoginDateTime { get; set; }
        public bool IsActive { get; set; }
        public List<Post> Posts { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Like> Likes { get; set; }
    }
}
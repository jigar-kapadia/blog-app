using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ICommentRepository
    {
         Task<List<Comment>> GetCommentsForPost(int postId);
         Task<Comment> CreateComment(Comment comment);
         Task<Comment> UpdateComment(Comment comment);
         Task DeleteComment(int commentId);
    }
}
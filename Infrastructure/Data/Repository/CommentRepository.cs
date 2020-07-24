using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly Infrastructure.Data.AppContext _appContext;
        public CommentRepository(Infrastructure.Data.AppContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<Comment> CreateComment(Comment comment)
        {
            var commentAdded = await _appContext.Comments.AddAsync(comment);
            await _appContext.SaveChangesAsync();
            return comment;
        }

        public async Task DeleteComment(int commentId)
        {
            var commentToMarkDelete = await _appContext.Comments.FirstOrDefaultAsync(x => x.Id == commentId);
            commentToMarkDelete.IsDeleted = true;
            _appContext.Comments.Update(commentToMarkDelete);
            await _appContext.SaveChangesAsync();
        }

        public async Task<List<Comment>> GetCommentsForPost(int postId)
        {
            var posts = await _appContext.Comments.Where(x => x.PostId == postId)
            .Include(x => x.Account).Include(x => x.Post).ToListAsync();
            return posts;
        }

        public async Task<Comment> UpdateComment(Comment comment)
        {
            _appContext.Comments.Update(comment);
            await _appContext.SaveChangesAsync();
            return comment;            
        }
    }
}
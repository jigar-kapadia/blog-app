using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly Infrastructure.Data.AppContext _appContext;
        public PostRepository(Infrastructure.Data.AppContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<Post> CreatePostAsync(Post post)
        {
            await _appContext.Posts.AddAsync(post);
            await _appContext.SaveChangesAsync();
            return post;
        }

        public async Task DeletePostAsync(int postId)
        {
            var postToRemove = await _appContext.Posts.FindAsync(postId);
            postToRemove.IsDeleted = true;
            _appContext.Posts.Update(postToRemove);
             //_appContext.Posts.Remove(postToRemove);
            await _appContext.SaveChangesAsync();
        }

        public async Task<List<Post>> GetAllPosts()
        {
            return await _appContext.Set<Post>()
            .Include(x => x.Account)
            .Include(x => x.Comments)
            .Include(x => x.Likes)
            .ToListAsync();
        }

        public async Task<Post> GetPostByIdAsync(int postId)
        {
            return await _appContext.Posts.Include(x => x.Account).Include(x => x.Comments)
            .Include(x => x.Likes).FirstOrDefaultAsync(x => x.Id == postId);
        }

        public async Task<Post> UpdatePostAsync(Post post)
        {
            //var post1 = await _appContext.Posts.FirstOrDefaultAsync(x => x.Id == post.Id);
            _appContext.Posts.Update(post);
            await _appContext.SaveChangesAsync();
            return post;
        }
    }
}
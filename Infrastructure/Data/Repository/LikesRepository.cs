using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repository
{
    public class LikesRepository : ILikesRepository
    {
        private readonly Infrastructure.Data.AppContext _appContext;
        public LikesRepository(Infrastructure.Data.AppContext appContext)
        {
            this._appContext = appContext;
        }

        public async Task CreateLikeAsync(Like like)
        {
            var likeObj = await _appContext.Likes
            .FirstOrDefaultAsync(x => x.PostId == like.PostId && x.LikedbyAccountId == like.LikedbyAccountId);

            if(likeObj != null)
            {
                likeObj.IsLiked = !likeObj.IsLiked;
                _appContext.Likes.Update(likeObj);
            }
            else
            {
                var likeCreated = await _appContext.Likes.AddAsync(like);
            }
            await _appContext.SaveChangesAsync();
        }

        public async Task<List<Like>> GetLikesByPost(int postId)
        {
            return await _appContext.Likes
            .Include(x => x.LikedbyAccount)
            .Where(x => x.PostId == postId)
            .ToListAsync();
        }

        public async Task UpdateLikeAsync(int likeId)
        {
            var likeObj = await _appContext.Likes.FirstOrDefaultAsync(x => x.Id == likeId);
            likeObj.IsLiked = !likeObj.IsLiked;
            await _appContext.SaveChangesAsync();
        }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ILikesRepository
    {
         Task<List<Like>> GetLikesByPost(int postId);

         Task CreateLikeAsync(Like like);

         Task UpdateLikeAsync(int likeId);
    }
}
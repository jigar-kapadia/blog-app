using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> GetPostByIdAsync(int postId);
        Task<List<Post>> GetAllPosts();
        Task<Post> CreatePostAsync(Post post);
        Task<Post> UpdatePostAsync(Post post);
        Task DeletePostAsync(int postId);
    }
}
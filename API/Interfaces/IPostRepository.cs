using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<bool> PostExists(int postId);
        Task<bool> SaveAllAsync();
        Task AddPost(Post post);
        Task<Post> GetPost(int postId);
        Task<IEnumerable<Post>> GetAllPostsForUserByUserId(int userId);
        Task<IEnumerable<Post>> GetPostsBtwDates(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<Post>> GetNotCollectedPosts();
        void CollectPost(Post post);
        void DeletePost(Post post);
    }
}
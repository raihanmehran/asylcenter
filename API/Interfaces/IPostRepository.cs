using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<bool> PostExists(int postId);
        Task AddPost(Post post);
        Task<Post> GetPost(int postId);
        Task<IEnumerable<Post>> GetAllPostsForUserByUserId(int userId);
        Task<IEnumerable<Post>> GetPostsBtwDates(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<Post>> GetNotCollectedPosts();
        Task<int> GetAllPostsCount();
        void UpdatePost(Post post);
        void DeletePost(int postId);
    }
}
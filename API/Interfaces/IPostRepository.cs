using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<bool> SaveAllAsync();
        Task AddPost(Post post);
        Task<Post> GetPost(int postId);
        Task<IEnumerable<Post>> GetAllPostsForUserByUserId(int userId);
        Task<IEnumerable<Post>> GetPostsBtwDates(DateTime fromDate, DateTime toDate);
    }
}
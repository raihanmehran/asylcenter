using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;

        public PostRepository(DataContext context, IMapper mapper)
        {
            _context = context;
        }
        public async Task<bool> PostExists(int postId)
        {
            return await _context.Posts
                .Where(post => post.IsDeleted != true)
                .AnyAsync(post => post.Id == postId);
        }
        public async Task AddPost(Post post)
        {
            await _context.Posts.AddAsync(post);
        }

        public async Task<IEnumerable<Post>> GetAllPostsForUserByUserId(int userId)
        {
            return await _context.Posts
                .Where(post => post.AppUserId == userId)
                .Where(post => post.IsDeleted != true)
                .OrderByDescending(p => p.Created)
                .ToListAsync();
        }
        public Task<IEnumerable<Post>> GetAllPostsForUserByUserIdNotCollected(int userId)
        {
            // this filtering is done in the Angular client app
            throw new NotImplementedException();
        }

        public async Task<Post> GetPost(int postId)
        {
            return await _context.Posts
                .Where(post => post.Id == postId)
                .Where(post => post.IsDeleted != true)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsBtwDates(DateTime fromDate, DateTime toDate)
        {
            return await _context.Posts
                .Where(post => post.Created >= fromDate
                    && post.Created <= toDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetNotCollectedPosts()
        {
            return await _context.Posts
                .Include(post => post.AppUser)
                .Where(post => post.IsCollected == false)
                .Where(post => post.IsDeleted != true)
                .OrderByDescending(post => post.Created)
                .ToListAsync();
        }

        public async Task<int> GetAllPostsCount()
        {
            return await _context.Posts
                .Where(post => post.IsDeleted != true)
                .CountAsync();
        }

        public void UpdatePost(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // No need for this method , because we are not actually deleting the post just hiding them from the user.
        public void DeletePost(int postId)
        {
            throw new NotImplementedException();
        }
    }
}
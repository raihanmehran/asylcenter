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
            return await _context.Posts.AnyAsync(post =>
                post.Id == postId);
        }
        public async Task AddPost(Post post)
        {
            await _context.Posts.AddAsync(post);
        }

        public async Task<IEnumerable<Post>> GetAllPostsForUserByUserId(int userId)
        {
            // has to be implemented in userRepository
            throw new NotImplementedException();
        }

        public async Task<Post> GetPost(int postId)
        {
            return await _context.Posts
                .Where(post => post.Id == postId)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsBtwDates(DateTime fromDate, DateTime toDate)
        {
            return await _context.Posts
                .Where(post => post.Created >= fromDate
                    && post.Created <= toDate)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
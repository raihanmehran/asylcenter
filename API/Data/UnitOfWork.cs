using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly RoleManager<AppRole> _roleManager;
        public UnitOfWork(DataContext context, IMapper mapper, RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _context = context;
        }
        public IUserRepository UserRepository => new UserRepository(
            context: _context, mapper: _mapper, roleManager: _roleManager);

        public IPostRepository PostRepository => new PostRepository(
            context: _context, mapper: _mapper);

        public IEventRepository EventRepository => new EventRepository(
            context: _context, mapper: _mapper);

        public IFeedbackRepository FeedbackRepository => new FeedbackRepository(
            context: _context);

        public IContactRepository ContactRepository => new ContactRepository(
            context: _context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
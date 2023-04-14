namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IPostRepository PostRepository { get; }
        IEventRepository EventRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        IContactRepository ContactRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
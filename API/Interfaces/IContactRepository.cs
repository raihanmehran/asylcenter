using API.Entities;

namespace API.Interfaces
{
    public interface IContactRepository
    {
        Task ContactDeveloper(Contact contact);
        Task<bool> SaveAllAsync();
    }
}
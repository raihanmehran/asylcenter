using API.Entities;

namespace API.Interfaces
{
    public interface IContactRepository
    {
        Task<bool> ContactDeveloper(Contact contact);
    }
}
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly DataContext _context;
        public ContactRepository(DataContext context)
        {
            _context = context;
        }

        public async Task ContactDeveloper(Contact contact)
        {
            await _context.Contacts.AddAsync(contact);
        }

    }
}
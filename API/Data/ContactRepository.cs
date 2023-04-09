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

        public async Task<bool> ContactDeveloper(Contact contact)
        {
            _context.Contacts.Add(contact);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
using asylcenter.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace asylcenter.Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppUser>()
                .HasOne(u => u.Photo)
                .WithOne(p => p.AppUser)
                .HasForeignKey<Photo>(p => p.Id);
        }
    }
}

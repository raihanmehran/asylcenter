using asylcenter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace asylcenter.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"),
                    options => options.MigrationsAssembly("asylcenter.API"));                
            });

            services.AddCors();

            return services;
        }
    }
}

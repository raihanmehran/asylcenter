using asylcenter.Application.Interfaces;
using asylcenter.Application.Services.TokenService;
using asylcenter.Infrastructure.Data;
using asylcenter.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using MediatR;

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
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddMediatR(Assembly.GetExecutingAssembly());            
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddHttpContextAccessor();

            return services;
        }
    }
}

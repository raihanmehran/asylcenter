using asylcenter.Application.DTOs;
using asylcenter.Domain.Entities;
using AutoMapper;
using asylcenter.Application.Helpers;

namespace asylcenter.Application.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDTO>()
                .ForMember(u => u.PhotoUrl, opt => opt
                    .MapFrom(src => src.Photo.Url));
                //.ForMember(u => u.Age, opt => opt
                //    .MapFrom(src => src.DateOfBirth.Calculate()));

            CreateMap<Photo, PhotoDTO>();
        }
    }
}

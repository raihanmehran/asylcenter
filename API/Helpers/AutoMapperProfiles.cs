using API.DTOs;
using API.Entities;
using AutoMapper;
using API.Extensions;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt
                    .MapFrom(src => src.Photos
                        .FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt
                    .MapFrom(src => src.DateOfBirth.CalcuateAge()));

            CreateMap<Photo, PhotoDto>();
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<PostDto, Post>();
            CreateMap<AppUser, PostUserDto>();
            CreateMap<Post, PostDto>()
                .ForMember(dest => dest.IdNumber, opt => opt
                    .MapFrom(src => src.AppUser.IdNumber));
            CreateMap<EventDto, Event>();
            CreateMap<Event, EventDto>();
            CreateMap<EventFeedbackDto, EventFeedback>();
            CreateMap<EventFeedback, EventFeedbackDto>();
        }
    }
}
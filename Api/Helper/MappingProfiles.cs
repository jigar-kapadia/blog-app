using Api.DTO;
using AutoMapper;
using Core.Entities;

namespace Api.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
                CreateMap<Post, PostDto>()
                .ForMember(x => x.PostId, p => p.MapFrom(x => x.Id))
                .ForMember(x => x.AccountId, p => p.MapFrom(x => x.Account.Id))
                .ForMember(x => x.Username, p => p.MapFrom(x => x.Account.UserName))
                .ForMember(x => x.Comments, p => p.MapFrom(x => x.Comments))
                .ForMember(x => x.LikesList, p => p.MapFrom(x => x.Likes))
                .ForMember(x => x.TotalLikes, p => p.MapFrom(x => x.Likes.Count));

                CreateMap<Post, PostRequestDto>().ReverseMap();
                CreateMap<Comment, CommentRequestDto>().ReverseMap();

                CreateMap<Comment, CommentDto>()
                .ForMember(x => x.AccountId, p => p.MapFrom(x => x.Account.Id))
                .ForMember(x => x.PostId, p => p.MapFrom(x => x.Post.Id))
                .ForMember(x => x.UserName, p => p.MapFrom(x => x.Account.UserName));

        }
    }
}
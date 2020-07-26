using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Errors;
using Api.Helper;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class PostController : BaseController
    {
        private readonly IPostRepository _postRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly ILikesRepository _likesRepository;
        private readonly IMapper _mapper;
        public PostController(IPostRepository postRepository, IMapper mapper,
        ICommentRepository commentRepository, ILikesRepository likesRepository)
        {
            this._likesRepository = likesRepository;
            _commentRepository = commentRepository;
            _mapper = mapper;
            _postRepository = postRepository;
        }

    [HttpGet]
    public async Task<ActionResult<Pagination<Post>>> GetPosts([FromQuery] PostSpecificationParams postParams)
    {
        var posts = await _postRepository.GetAllPosts();
        //Sort, Paging
        //var response = new Pagination<Post>(postParams.PageSize, postParams.PageIndex, 0, posts);
        var accId = Request.Headers["accountid"].ToString();
        var postsDto = _mapper.Map<List<Post>, List<PostDto>>(posts);
        //Sorting
        postsDto = postsDto.OrderByDescending(x => x.CreatedDate).ToList();

        //Paging
        postsDto = postsDto.Skip(postParams.PageIndex - 1 * postParams.PageSize)
                    .Take(postParams.PageSize).ToList();
        

        postsDto = postsDto?.Select(x =>
        {
            x.IsCurrentUserLiked = x.LikesList.Any(x => x.AccountId == Convert.ToInt32(accId));
            return x;
        }).ToList();
        return Ok(postsDto);
    }

    [HttpPost]
    public async Task<ActionResult<PostDto>> CreatePost(PostRequestDto postDto)
    {
        postDto.CreatedDate = DateTime.Now;
        //postDto.
        var post = await _postRepository.CreatePostAsync(_mapper.Map<PostRequestDto, Post>(postDto));

        return Ok(_mapper.Map<Post, PostDto>(post));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PostDto>> GetPostByPostId(int id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null) return BadRequest(new ApiResponse(400));
        return Ok(_mapper.Map<Post, PostDto>(post));
    }

    [HttpGet("user")]
    public async Task<ActionResult<List<PostDto>>> GetPostsByUser()
    {
        var accId = Request.Headers["accountid"].ToString();
        var posts = await _postRepository.GetAllPosts();
        posts = posts.Where(x => x.AccountId == Convert.ToInt32(accId)).ToList();
        var postsDto = _mapper.Map<List<Post>, List<PostDto>>(posts);
        return Ok(postsDto);
    }

    [HttpPut]
    public async Task<ActionResult<PostDto>> UpdatePost(PostRequestDto postRequestDto)
    {
        postRequestDto.CreatedDate = DateTime.Now;
        var postUpdated = await _postRepository.UpdatePostAsync(_mapper.Map<PostRequestDto, Post>(postRequestDto));
        return Ok(_mapper.Map<Post, PostDto>(postUpdated));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePost(int id)
    {
        await _postRepository.DeletePostAsync(id);
        return Ok();
    }


    [HttpPost("{id}/comment")]
    public async Task<ActionResult> CreateComment(CommentRequestDto comment)
    {
        comment.CreatedDate = DateTime.Now;
        var commentToCreate = _mapper.Map<CommentRequestDto, Comment>(comment);
        commentToCreate = await _commentRepository.CreateComment(commentToCreate);
        return Ok(_mapper.Map<Comment, CommentDto>(commentToCreate));
    }

    [HttpGet("{id}/comment")]
    public async Task<ActionResult<List<CommentDto>>> GetCommentByPost(int id)
    {
        var comments = await _commentRepository.GetCommentsForPost(id);
        return Ok(_mapper.Map<List<Comment>, List<CommentDto>>(comments));
    }

    [HttpPut("{id}/comment")]
    public async Task<ActionResult> UpdateComment(CommentRequestDto commentRequestDto)
    {
        commentRequestDto.CreatedDate = DateTime.Now;
        var commentToCreate = _mapper.Map<CommentRequestDto, Comment>(commentRequestDto);
        var commentUpdated = await _commentRepository.UpdateComment(commentToCreate);
        return Ok(_mapper.Map<Comment, CommentDto>(commentUpdated));
    }

    [HttpDelete("{id}/comment/{commentid}")]
    public async Task<ActionResult> DeleteComment(int commentid)
    {
        await _commentRepository.DeleteComment(commentid);
        return Ok();
    }

    [HttpGet("{id}/like")]
    public async Task<ActionResult> GetLikesByPost(int id)
    {
        var likes = await _likesRepository.GetLikesByPost(id);
        return Ok(_mapper.Map<List<Like>, List<LikesDto>>(likes));
    }


    [HttpPost("{id}/like")]
    public async Task<ActionResult> CreateLike(LikesDto likesDto)
    {
        var likeObj = new Like { PostId = likesDto.PostId, LikedbyAccountId = likesDto.AccountId, CreatedDate = DateTime.Now, IsLiked = true };
        await _likesRepository.CreateLikeAsync(likeObj);
        return Ok();
    }

    [HttpPut("{id}/like/{likeid}")]
    public async Task<ActionResult> UpdateLike(int likeId)
    {
        await _likesRepository.UpdateLikeAsync(likeId);
        return Ok();
    }

    // [HttpPut]
    // public async Task<ActionResult<List<PostDto>> UpdatePost(PostRequestDto postRequestDto)
    // {
    //     // postRequestDto.CreatedDate = DateTime.Now;
    //     return Ok();
    // }


}
}
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
    public async Task<ActionResult<Pagination<PostDto>>> GetPosts([FromQuery] PostSpecificationParams postParams)
    {
        var posts = await _postRepository.GetAllPosts();
        //Sort, Paging
        //var response = new Pagination<Post>(postParams.PageSize, postParams.PageIndex, 0, posts);
        var accId = Request.Headers["accountid"].ToString();
        var postsDto = _mapper.Map<List<Post>, List<PostDto>>(posts);
        //Sorting
        postsDto = postsDto.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();

        //Paging
        postsDto = postsDto.Skip((postParams.PageIndex - 1) * postParams.PageSize)
                    .Take(postParams.PageSize).ToList();
        
        var maxCount = posts.Count;
        
        postsDto = postsDto?.Select(x =>
        {
            x.LikesList = x.LikesList.Where(x => x.IsLiked).OrderByDescending(x => x.CreatedDate).ToList();
            x.Comments = x.Comments.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();
            x.IsCurrentUserLiked = x.LikesList.Any(x => x.AccountId == Convert.ToInt32(accId) && x.IsLiked);
            return x;
        }).ToList();

        var pagingObj = new Pagination<PostDto>(postParams.PageSize, postParams.PageIndex, maxCount, postsDto);
        return Ok(pagingObj);
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
        var accId = Request.Headers["accountid"].ToString();
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null) return BadRequest(new ApiResponse(400));
        var postDto = _mapper.Map<Post, PostDto>(post);
        postDto.LikesList = postDto.LikesList.Where(x => x.IsLiked).OrderByDescending(x => x.CreatedDate).ToList();
        postDto.Comments = postDto.Comments.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();
        postDto.IsCurrentUserLiked = postDto.LikesList.FirstOrDefault(x => x.AccountId == Convert.ToInt32(accId) && x.IsLiked) != null;
        //postDto.IsCurrentUserLiked = postDto.LikesList.Any(x => x.AccountId == Convert.ToInt32(accId));
        return Ok(postDto);
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
    public async Task<ActionResult<List<CommentDto>>> CreateComment(CommentRequestDto comment)
    {
        comment.CreatedDate = DateTime.Now;
        var commentToCreate = _mapper.Map<CommentRequestDto, Comment>(comment);
        commentToCreate = await _commentRepository.CreateComment(commentToCreate);
        var comments = await _commentRepository.GetCommentsForPost(comment.PostId);
        comments = comments.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();
        return Ok(_mapper.Map<List<Comment>, List<CommentDto>>(comments));
    }

    [HttpGet("{id}/comment")]
    public async Task<ActionResult<List<CommentDto>>> GetCommentByPost(int id)
    {
        var comments = await _commentRepository.GetCommentsForPost(id);
        comments = comments.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();
        return Ok(_mapper.Map<List<Comment>, List<CommentDto>>(comments));
    }

    [HttpPut("{id}/comment")]
    public async Task<ActionResult> UpdateComment(CommentRequestDto commentRequestDto)
    {
        commentRequestDto.CreatedDate = DateTime.Now;
        var commentToCreate = _mapper.Map<CommentRequestDto, Comment>(commentRequestDto);
        var commentUpdated = await _commentRepository.UpdateComment(commentToCreate);
        var comments = await _commentRepository.GetCommentsForPost(commentRequestDto.PostId);
        comments = comments.Where(x => !x.IsDeleted).OrderByDescending(x => x.CreatedDate).ToList();
        return Ok(_mapper.Map<List<Comment>, List<CommentDto>>(comments));
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
        likes = likes.Where(x => x.IsLiked).ToList();
        return Ok(_mapper.Map<List<Like>, List<LikesDto>>(likes));
    }


    [HttpPost("{id}/like")]
    public async Task<ActionResult> CreateLike(LikesDto likesDto)
    {
        var likeObj = new Like { PostId = likesDto.PostId, LikedbyAccountId = likesDto.AccountId, CreatedDate = DateTime.Now, IsLiked = true };
        await _likesRepository.CreateLikeAsync(likeObj);
        var likes = await _likesRepository.GetLikesByPost(likesDto.PostId);        
        likes = likes.Where(x => x.IsLiked).ToList();
        return Ok(_mapper.Map<List<Like>, List<LikesDto>>(likes));
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
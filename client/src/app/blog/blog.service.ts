import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostParams } from '../shared/models/postParams';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  postParams: PostParams = new PostParams();
  baseUrl = environment.baseUrl;

  private currentPost = new BehaviorSubject<any>({});
  currentPost$ = this.currentPost.asObservable();
  private currentPostComments = new BehaviorSubject<any>({});
  currentPostComments$ = this.currentPostComments.asObservable();
  private currentPostLikes = new BehaviorSubject<any>({});
  currentPostLikes$ = this.currentPostLikes.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.postParams = new PostParams();
   }

  setPostParams(postPar: PostParams){
    this.postParams = postPar;
  }

  getPostParams(){
    return this.postParams;
  }

  createPost(post: any){
     return this.http.post(this.baseUrl + 'post', post);
  }

  updatePost(post: any){
    return this.http.put(this.baseUrl + 'post', post);
  }

  deletePost(post){
    return this.http.delete(this.baseUrl + 'post/' + post);
  }

  getPosts(){
    // const headers = new HttpHeaders()
    // .append('accountid', localStorage.getItem('id') ? localStorage.getItem('id') :'0');
    const params = new HttpParams()
    .set('sort', this.postParams.sort)
    .append('direction', this.postParams.direction)
    .set('pageIndex', this.postParams.pageIndex.toString())
    .set('pageSize', this.postParams.pageSize.toString());
    
    return this.http.get(this.baseUrl + 'post',  { params });
  }

  getPostById(postId){
    const headers = new HttpHeaders()
    .append('accountid', localStorage.getItem('id') ? localStorage.getItem('id') :'0');
    return this.http.get(this.baseUrl + 'post/' + postId, { headers });
    // .pipe(
    //   map(x => {
    //     this.currentPost.next(x);
    //     return x;
    //   })
    // );
  }

  getCommentsByPost(postId){
    return this.http.get(`${this.baseUrl}post/${postId}/comment`);
    // .pipe(map(x => {
    //   this.currentPostComments.next(x);
    //   return x;
    // }
    // ));
  }

  getLikesByPost(postId){
    return this.http.get(`${this.baseUrl}post/${postId}/like`);
    // .pipe(map(x => {
    //   this.currentPostLikes.next(x);
    //   return x;
    // }
    // ));
  }

  likePost(post){
    return this.http.post(`${this.baseUrl}post/${post.postId}/like`, post);
  }

  addCommentToPost(comment){
    return this.http.post(`${this.baseUrl}post/${comment.postId}/comment`, comment);
  }

  updateComment(comment){
    return this.http.put(`${this.baseUrl}post/${comment.postId}/comment`, comment);
  }

  deleteComment(comment){
    return this.http.delete(`${this.baseUrl}post/${comment.postId}/comment/${comment.id}`);
  }
}

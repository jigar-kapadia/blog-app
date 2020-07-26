import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostParams } from '../shared/models/postParams';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  postParams = new PostParams();
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  setPostParams(postPar: PostParams){
    this.postParams = postPar;
  }

  getPostParams(){
    return this.postParams;
  }

  createPost(post: any){
     return this.http.post(this.baseUrl + 'post', post);
  }

  getPosts(){
    const params = new HttpParams();
    params.append('sort', this.postParams.sort);
    params.append('direction', this.postParams.direction);
    params.append('pageIndex', this.postParams.pageIndex.toString());
    params.append('pageSize', this.postParams.pageSize.toString());
    return this.http.get(this.baseUrl + 'product', { params });
  }

}

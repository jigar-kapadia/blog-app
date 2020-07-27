import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { BlogService } from './blog.service';
import { PostParams } from '../shared/models/postParams';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  constructor(private router: Router, private blogService: BlogService) {}
  postParams: PostParams;
  posts$: Observable<any>;
  ngOnInit() {
    this.postParams = this.blogService.postParams;
    this.getPosts();
      this.blogService.getPosts()
      .subscribe(x => console.log(x)
      );
  }

  getPosts() {
      this.posts$ = this.blogService.getPosts();
  }

  goToPostCreate() {
    const accountId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    localStorage.setItem('p_id', '0');
    this.router.navigate(['blog/create']);
  }

  goToPost(postId){
    this.router.navigate(['blog/'], { queryParams : { id: postId }, queryParamsHandling: 'preserve' });
  }
}

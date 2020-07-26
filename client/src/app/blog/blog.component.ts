import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { BlogService } from './blog.service';
import { PostParams } from '../shared/models/postParams';
import { Observable } from 'rxjs';

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

  }

  getPostParams()
  {
      this.posts$ = this.blogService.getPosts();
  }

  goToPostCreate() {
    localStorage.setItem('p_id', '0');
    this.router.navigate(['blog/create']);
  }
}

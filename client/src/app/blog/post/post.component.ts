import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //postId: any;
  //objPost: any;
  post$: Observable<any>;

  post: any;
  comments$: Observable<any>;
  likes$: Observable<any>;
  commentsCount: any;
  likesCOunt: any;

  showCommentBox = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private blogService: BlogService) {
    // const navigation = router.getCurrentNavigation();
    // const state = navigation && navigation.extras && navigation.extras.state;
    // this.objPost = (state as object);
    // this.postId = this.objPost.id;
   }

  ngOnInit() {
    this.post$ = this.blogService.currentPost$;
    this.comments$ = this.blogService.currentPostComments$.pipe(
      map(x => {
        this.commentsCount = x.length;
        return x;
      })
    );
    this.likes$ = this.blogService.currentPostLikes$.pipe(
      map(x => {
        this.likesCOunt = x.length;
        return x;
      })
    );

  }

}

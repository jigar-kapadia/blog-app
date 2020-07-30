import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BlogService } from "../blog.service";
import { Observable, forkJoin, Subject } from "rxjs";
import { takeUntil, switchMap } from "rxjs/operators";
import { AccountService } from 'src/app/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit, OnDestroy {
  post: any;
  commentsCount: any;
  likesCOunt: any;
  currentUserLiked = false;
  showCommentBox = false;
  accountId: any;
  likes: any;
  comments: any;
  postId: any;
  private unsubscribe$: Subject<any> = new Subject<any>();
  isDataLoaded = false;
  commentToEdit: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {
    // const navigation = router.getCurrentNavigation();
    // const state = navigation && navigation.extras && navigation.extras.state;
    // this.objPost = (state as object);
    // this.postId = this.objPost.id;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((x) => {
      this.postId = x.id;
    });
    this.accountId = localStorage.getItem("id");

    const postOb$ = this.blogService.getPostById(this.postId);
    const commentOb$ = this.blogService.getCommentsByPost(this.postId);
    const likesOb$ = this.blogService.getLikesByPost(this.postId);

    forkJoin([postOb$, commentOb$, likesOb$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isDataLoaded = true;
        this.post = response[0];
        this.comments = response[1];
        this.likes = response[2];
      });

    // this.blogService.currentPost$.subscribe(x => this.post = x );
    // this.blogService.currentPostLikes$.subscribe(x => this.likes = x);
    // this.blogService.currentPostComments$.subscribe(x => this.comments = x);
  }

  likePost(post: any) {

    this.accountService.currentUser$.subscribe(response =>{
      if(response){
        
    // Get Like Object by AccountId
    let likePost = this.likes.filter((e) => e.accountId === +this.accountId);
    if (likePost && !(likePost.length > 0)) {
      likePost = {
        accountId: +this.accountId,
        id: 0,
        postId: post.postId,
        userName: "",
      };
    } else {
      likePost = likePost[0];
    }
    this.blogService.likePost(likePost).subscribe((x) => {
      this.likes = x;
    });
    //post.isCurrentUserLiked = !post.isCurrentUserLiked;
    this.post = { ...post };
      }
      else {
        this.router.navigate(['account/login'], {
          queryParams: { returnUrl: this.router.url },
        });
      }

    })

  }

  toggleCommentBox(event) {
    this.showCommentBox = event;
  }

  addComment(event) {

    console.log(event);

    if(event.id === 0){
      const comment = {
      id: 0,
      postId: +this.post.postId,
      accountId: +this.accountId,
      description: event.description,
    };
    this.blogService.addCommentToPost(comment)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => {
        this.comments = x;
        this.toastrService.success('Comment Added');
    });
    
    }
    else{
      
      this.blogService.updateComment(event)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => {
        this.comments = x;
        this.toastrService.success('Comment Updated');
    });
    }
    this.showCommentBox = false;
  }

  EditPost(id){
    const token = localStorage.getItem('token');
    localStorage.setItem('p_id', id.toString());
    this.router.navigate(['blog/create']);
  }

  DeletePost(id){
    this.blogService.deletePost(id)
    .subscribe(x => {
      this.router.navigate(['blog']);
    })
  }

  EditComment(item){
    this.showCommentBox = true;
    this.commentToEdit = item;

  }

  DeleteComment(comment){
    let b1 = this.blogService.deleteComment(comment);
    let b2 = this.blogService.getCommentsByPost(this.postId);

    b1.pipe(
      switchMap(data =>{
        return b2;
      })
    ).subscribe(res => {
      this.comments = res;
    })
    //   .subscribe(x => {
    //     this.comments = x;
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

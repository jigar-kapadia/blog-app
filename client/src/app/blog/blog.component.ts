import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationExtras, Router, ActivatedRoute } from "@angular/router";
import { BlogService } from './blog.service';
import { PostParams } from '../shared/models/postParams';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AccountService } from '../account/account.service';

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute,
    private blogService: BlogService,private accountService: AccountService) {}
  postParams: PostParams;
  posts$: Observable<any>;
  showCommentBox = false;
  accountId: any;
  pagingData: any;
  private unsubscribe$: Subject<any> = new Subject<any>();
  ngOnInit() {
    this.accountId = localStorage.getItem('id');
    this.postParams = this.blogService.postParams;
    this.getPosts();
  }

  getPosts() {
      //this.posts$ = 
      this.blogService.getPosts().pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
        this.pagingData = x;
      });
  }

  Paging(direction){
    this.postParams.pageIndex = direction === 'next' ? this.postParams.pageIndex + 1 :
    (direction === 'previous' ? this.postParams.pageIndex - 1 : 1);
    this.blogService.setPostParams(this.postParams);
    this.getPosts();
  }

  goToPostCreate(id) {
    const token = localStorage.getItem('token');
    localStorage.setItem('p_id', id.toString());
    this.router.navigate(['blog/create']);
  }

  goToPost(postId){
    this.router.navigate(['blog/'], { queryParams : { id: postId }, queryParamsHandling: 'preserve' });
  }

  deletePost(postId){
    this.blogService.deletePost(postId)
    .subscribe(x => {
        this.getPosts();
    });
  }

  toggleCommentBox(event){

  }

  likePost(post){

    this.accountService.currentUser$.subscribe(response => {
      if(response){
        let likePost = post.likesList.filter(e => e.accountId === +this.accountId);
        if(likePost && !(likePost.length > 0)){
          likePost = {
            accountId: +this.accountId,
            id: 0,
            postId: post.postId,
            userName: ''
          };
        }else{
          likePost = likePost[0];
        }
        this.blogService.likePost(likePost).subscribe(x => {
          post.likesList = x;
          });
      }
      else{
        this.router.navigate(['account/login'], {
          queryParams: { returnUrl: this.router.url },
        });
        
      }
    });

    
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

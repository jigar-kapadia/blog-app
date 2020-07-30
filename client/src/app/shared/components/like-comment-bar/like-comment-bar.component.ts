import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-like-comment-bar',
  templateUrl: './like-comment-bar.component.html',
  styleUrls: ['./like-comment-bar.component.scss']
})
export class LikeCommentBarComponent implements OnInit, OnChanges {
  @Input() post: any;
  @Output() postLiked = new EventEmitter<any>();
  @Input() showCommentBox ? = false;
  @Output() toggleCommentBox = new EventEmitter<any>();
  showBar: any;
  constructor(private accountService: AccountService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.accountService.currentUser$.subscribe(x => {
      this.showBar = x ? true : false;
    })
  }

  ngOnChanges() {
    // console.log(this.post.isCurrentUserLiked);
  }

  likedPost(){
    
        this.post.isCurrentUserLiked = !this.post.isCurrentUserLiked;
        this.postLiked.emit(this.post);
     
        
        // this.router.navigate(['account/login'], {
        //   queryParams: { returnUrl: this.route.url },
        // });
     

    
    
  }

  showHideCommentBox() {
    this.showCommentBox = !this.showCommentBox;
    this.toggleCommentBox.emit(this.showCommentBox);
  }

}

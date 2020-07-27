import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-likecommentsharecount',
  templateUrl: './likecommentsharecount.component.html',
  styleUrls: ['./likecommentsharecount.component.scss']
})
export class LikecommentsharecountComponent implements OnInit {

  constructor() { }
  @Input() likes: any;
  @Input() comments: any;
  @Input() shares: any;
  @Input() isBlog? : any = true;
  //@Output() onLikeClick
  //@Output() onCommentClick

  ngOnInit() {
  }

}

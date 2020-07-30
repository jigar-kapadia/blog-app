import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  @Output() commentAdd = new EventEmitter();
  @Input() commnetObj : any = {};
  comment: any;

  constructor() { }

  ngOnInit() {
    console.log(this.commnetObj);
    if(this.commnetObj !== undefined && this.commnetObj !== null){
      this.comment = this.commnetObj.description; 
    }
    else{
      this.commnetObj = { id: 0 ,description : '' }
    }
     
    
  }

  SubmitComment(form: NgForm){
    this.commnetObj.description = this.comment;
    this.commentAdd.emit(this.commnetObj);
  }

}

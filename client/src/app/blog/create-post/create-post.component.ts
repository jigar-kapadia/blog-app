import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;
  postid: any;
  obj: any;
  constructor(private formBuilder: FormBuilder, private blogService: BlogService,
              private toastrService: ToastrService, private router: Router, private activiatedRoute: ActivatedRoute) {
      // const navigation = this.router.getCurrentNavigation();
      // const state  = navigation && navigation.extras && navigation.extras.state;
      // if (state) {
      //   this.obj = state;
      // }
    }

  ngOnInit() {
   this.postid = localStorage.getItem('p_id');
   if(this.postid > 0){
     this.blogService.getPostById(this.postid).subscribe(response => {
       this.postForm.patchValue(response);
       this.obj = response;
     })
   }
   this.createForm();
  }

  createForm() {
    this.postForm = new FormGroup({
      title : new FormControl('', [Validators.required]),
      description : new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(+this.postid === 0){
      const accountId = Number(localStorage.getItem('id'));
      const post = { ...this.postForm.value, accountId };
      this.blogService.createPost(post)
      .subscribe(response => {
      this.toastrService.success('Post Created');
      this.router.navigate(['blog']);
      }, err => {
        console.log(err);
        this.toastrService.error(err);
      });
    }
    else{
      this.obj.title = this.postForm.get('title').value;
      this.obj.description = this.postForm.get('description').value;
      this.obj.id = +this.postid;
      this.blogService.updatePost(this.obj).subscribe(response => {
          this.router.navigate(['blog/post'], { queryParams : { id: this.postid } });
      });
    }
  }
}

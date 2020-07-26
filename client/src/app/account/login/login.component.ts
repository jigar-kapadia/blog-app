import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountModule } from '../account.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/blog';
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{1,4}$')]),
      password : new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value)
    .subscribe(x => {
      console.log('Logged in');
      this.router.navigateByUrl(this.returnUrl);
    }, err => {
      console.log(err);
    });
  }


}

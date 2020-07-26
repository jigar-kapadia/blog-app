import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  formErrors: [];

  constructor(private router: Router, private formBuilder: FormBuilder,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute, private toastrService: ToastrService
              ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      userName: new FormControl(null, Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{1,4}$'),
      ], [ 
        this.checkIfEmailExists()
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(
      (x) => {
        this.toastrService.success('User Successfully Registered!');
        this.router.navigateByUrl('/blog');
      },
      (err) => {
        this.formErrors = err.error.errors.Password;
      }
    );
  }

  isEmailExists(): boolean {
    return this.registerForm.get('email').hasError('emailExists');
  }

  checkIfEmailExists(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }

}

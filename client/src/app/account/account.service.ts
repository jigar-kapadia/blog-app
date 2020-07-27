import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { IUser } from '../shared/user';
import { map } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  private currentUserSubject = new ReplaySubject<IUser>(null); //new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  register(creds: any){
    return this.http.post(this.baseUrl + 'account/register', creds)
    .pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('id', user.accountId.toString());
        this.currentUserSubject.next(user);
      })
    );
  }

  checkEmailExists(email: string)
  {
    return this.http.get(this.baseUrl + 'account/checkemail?email=' + email);
  }

  login(creds: any){
    return this.http.post(this.baseUrl + 'account/login', creds)
    .pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('id', user.accountId.toString());
        this.currentUserSubject.next(user);
      })
    );
  }

  loadCurrentUser(token?: string, id? : number | string){
    if(id === null || token === null) { 
      this.currentUserSubject.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('accountid', id.toString());
    return this.http.get(this.baseUrl + 'account', {headers})
    .pipe(
      map((user: any) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('id', user.accountId.toString());
        this.currentUserSubject.next(user);
      })
    );
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/');
  }

}

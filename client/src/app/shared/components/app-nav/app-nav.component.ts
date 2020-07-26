import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper.service';
import { AccountService } from 'src/app/account/account.service';
import { Observable } from 'rxjs';
import { IUser } from '../../user';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  changeColor = false;
  currentUser$: Observable<IUser>;
  constructor(private router: Router, private helperService: HelperService, private accountService: AccountService) {

   }

  ngOnInit() {
    this.helperService.currentUrl$.subscribe(x => this.changeColor = x);
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout(){
    this.accountService.logout();
  }


}

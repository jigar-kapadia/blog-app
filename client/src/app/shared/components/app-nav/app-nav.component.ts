import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  changeColor = false;
  constructor(private router: Router, private helperService: HelperService) {

   }

  ngOnInit() {
    this.helperService.currentUrl$.subscribe(x => this.changeColor = x);
    console.log(this.changeColor);
    
  }


}

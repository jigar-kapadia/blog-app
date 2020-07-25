import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { HelperService } from './core/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  showHeader = false;
  constructor(private router: Router, private helperService: HelperService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        if (event.url === '/blog' || event.url === '/') {
          this.showHeader = true;
          this.helperService.isColorChange(true);
          
          
        } else {
          this.showHeader = false;
          this.helperService.isColorChange(true);
        }
      }
    });
  }
  ngOnInit(): void {}
}

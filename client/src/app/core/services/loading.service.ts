

import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
    
    onGoingRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  busy(){
    // this.onGoingRequestCount++;
    // this.spinnerService.show(undefined, {
    //   type: 'line-scale-pulse-out',
    //   bdColor : 'rgba(255,255,255,0.7)',
    //   color: '#333333',
    //   size: 'medium'
    // });
  }

  idle(){
    // this.onGoingRequestCount--;
    // if(this.onGoingRequestCount <= 0)
    // {
    //   this.spinnerService.hide();
    // }
  }
}
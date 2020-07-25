import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private currentUrlSubject = new ReplaySubject<any>();
  currentUrl$ = this.currentUrlSubject.asObservable();
  constructor() { }

  isColorChange(val){
    console.log(val);
    
    this.currentUrlSubject.next(val);
  }

}

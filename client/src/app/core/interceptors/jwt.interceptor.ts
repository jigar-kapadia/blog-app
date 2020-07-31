

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        // req = req.clone({
        //   //headers : ('accountid', localStorage.getItem('id') ? localStorage.getItem('id') :'0'),
 
        //     setHeaders: {
        //       Authorization: `Bearer ${token}`,
        //       //accountid : id
        //     },
        //   });

        if(token && id){
          req = req.clone({
            headers : req.headers.set('Authorization', 'Bearer '+ token).set('accountid', id)
          });
        }

        return next.handle(req);

    }
}
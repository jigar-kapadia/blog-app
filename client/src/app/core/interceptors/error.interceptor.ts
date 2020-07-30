import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastrService: ToastrService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error){
                    if (error.status === 400) {
                        if (error.error.errors){
                            throw error.error;
                        // tslint:disable-next-line: align
                        }
                        else{
                            this.toastrService.error(error.error.message, error.error.statusCode);
                        }
                    }
                    if (error.status === 401) {
                        this.toastrService.error(error.error.message, error.error.statusCode);
                    }
                    if (error.status === 404){
                        this.toastrService.error(error.error.message, error.error.statusCode);

                    }
                    if (error.status === 500){
                        this.toastrService.error(error.error.message, error.error.statusCode);

                       //// this.router.navigateByUrl('/servererror', { state : { error : error.error } });
                    }
                }
                return throwError(error);
            })
        );
    }
}
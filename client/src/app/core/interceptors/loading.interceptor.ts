import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.busy();
    return next.handle(req).pipe(
      delay(3000),
      finalize(() => {
        this.loaderService.idle();
      })
    );
  }
}

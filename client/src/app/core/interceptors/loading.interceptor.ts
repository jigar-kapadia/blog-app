import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === "POST" && req.url.includes("order")) {
      return next.handle(req);
    }
    if (req.method === "DELETE") {
      return next.handle(req);
    }
    if (!req.url.includes("checkemail")) {
      this.loaderService.busy();
      //   return next.handle(req).pipe(
      //     delay(1000),
      //     finalize(() => {
      //       this.loaderService.idle();
      //     })
      //   );
    }
    return next.handle(req).pipe(
      //delay(1000),
      finalize(() => {
        this.loaderService.idle();
      })
    );
  }
}

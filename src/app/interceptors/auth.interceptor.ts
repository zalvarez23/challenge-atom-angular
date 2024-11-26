import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userId = localStorage.getItem('userId');

    const authReq = userId
      ? req.clone({
          setHeaders: {
            Authorization: userId,
          },
        })
      : req;

    return next.handle(authReq);
  }
}

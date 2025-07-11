import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: UserStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.store.getJwtToken();

    // console.log('AuthInterceptor Token:', token);

    if (token) {
      const clonedReq = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedReq);
    }

    return next.handle(request);
  }
}

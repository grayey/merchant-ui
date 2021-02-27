import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { UserService } from './user/user.service';
// import { Cache } from '../utils/cache';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const X_JWT_TOKEN = localStorage.getItem('X_JWT_TOKEN');
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});
    if (X_JWT_TOKEN) {
      req = req.clone({headers: req.headers.set('x-jwt-token', X_JWT_TOKEN)});
    }
    if (this.userService.isLoggedIn()) {
      req = req.clone({headers: req.headers.set('Authorization', this.userService.getAuthUserToken())});
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    return next.handle(req);
  }

}

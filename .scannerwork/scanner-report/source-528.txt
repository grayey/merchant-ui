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

    const REQUEST_CONTENT = req.url.endsWith('oauth/token')? 'x-www-form-urlencoded': 'json'
    req = req.clone({headers: req.headers.set('Accept', `application/${REQUEST_CONTENT}`)});

   
    // if (this.userService.isLoggedIn()) {
    req = req.clone({headers: req.headers.set('Authorization', this.userService.getAuthUserToken(req.url))});

    // }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({headers: req.headers.set('Content-Type', `application/${REQUEST_CONTENT}`)});
    }

    return next.handle(req);
  }

}

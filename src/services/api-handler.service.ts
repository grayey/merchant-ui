import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/operators/map';
import 'rxjs/operators/retryWhen';
import 'rxjs/operators/delay';
import 'rxjs/operators/take';
import { ApiConfig } from '../utils/config';
import { UserService } from './user/user.service';
import { environment } from '../environments/environment';

@Injectable()
export class ApiHandlerService extends ApiConfig{

  public static API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient, userService: UserService) {
    super(userService);
  }


  /**
   *
   * This is used to make get requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
  public get(path: string, paginator?): Observable<any> {
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL;
    return this.http.get(`${url}`, this.headers).retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res['body']);
  }



  /**
   * This is used to make post requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   */
  public post(path: string, data?: any): Observable<any> {

    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL;
    return this.http.post(url, (data || {}), this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => {
        const X_JWT_TOKEN = res['headers'].get('x-jwt-token');
        if(X_JWT_TOKEN){
          localStorage.setItem('X_JWT_TOKEN', X_JWT_TOKEN)
        }
        return res['body'];
      });
  }



  /**
   *
   * This is used to make put requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
  public put(path: string, data?: Object): Observable<any> {
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL;
    return this.http.put(url, (data || {}) || {}, this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res['body']);
  }



  /**
   * This is used to make delete requests
   * @param path
   * @returns {Observable<R>}
   */
  public delete(path: string): Observable<any> {
    this.headers = {headers: this.setHeaders()};
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL; //set back in case of subsequent calls
    return this.http.delete(url, this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => {
        console.log(res['body'],'RESSS');
        return res;
      });
  }



  /**
   * This is used catch error
   * @param err
   * @returns {any}
   */
  private errorHandler(err) {

    try{
      return Observable.throw(err || 'Server error');
    }catch(e){
      return Observable.from([ ])
    }

  }

}



import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ApiConfig } from '../utils/config';
import { UserService } from './user/user.service';
import { environment } from '../environments/environment';
import { map, retryWhen, delay, take, catchError } from "rxjs/operators";
import { AuthService } from "src/services/auth.service";
import CONSTANTS from "../utils/constants";
import { ToastrService } from 'ngx-toastr';

declare const $:any;


@Injectable()
export class ApiHandlerService extends ApiConfig{

  public static API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient, userService: UserService, 
    private authService:AuthService, private toastr:ToastrService) {
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
    return this.http.get(`${url}`, this.headers).pipe(
      retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
    ).pipe(
      catchError((err) => this.errorHandler(err))
    ).pipe(
      map((res) => {
        return res['body'];
      })
      )
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
    return this.http.post(url, data || {}, this.headers).pipe(
      retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
    ).pipe(
      catchError((err) => this.errorHandler(err))
    ).pipe(
      map((res) => res['body'])
    )
      // retryWhen((errors) => {
      //   return errors
      //     .mergeMap((error) => this.errorHandler(error))
      //     .delay(1000)
      //     .take(2);
      // })
      // .catch(this.errorHandler)
      // .map((res) => {
      //   const X_JWT_TOKEN = res['headers'].get('x-jwt-token');
      //   if(X_JWT_TOKEN){
      //     localStorage.setItem('X_JWT_TOKEN', X_JWT_TOKEN)
      //   }
      //   return res['body'];
      // })
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
    return this.http.put(url, (data || {}) || {}, this.headers).pipe(
      retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
    ).pipe(
      catchError((err) => this.errorHandler(err))
    ).pipe(
      map((res) => {
        return res['body'];
      })
      )
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
      .catch((err) => this.errorHandler(err))
      .map((res) => {
        console.log(res['body'],'RESSS');
        return res;
      });
  }



  /**
   * 
   * @param path 
   * this method retrieve a file
   */
  public getFile = (path): Observable<HttpResponse<Blob>> => {
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    ApiConfig.EXPECT_FILE = "blob";
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL;
    const fileResponse = this.http.get(`${url}`, this.headers).retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch((err) => this.errorHandler(err))
      .map((res) => res);
      ApiConfig.EXPECT_FILE = null;
      return fileResponse;
  }

  /**
   *
   * @param {Object} data
   * @param formFile without header
   * @param {string} urlLink
   * @returns {Observable<any>}
   */
   public postFile(data, formFile, urlLink: string, file_key = 'fileName'): Observable<any> {
    ApiConfig.EXPECT_FILE = "blob";
    const formData = new FormData();
    const file = formFile.files[0];
    // const file = formFile;
    // const path = $.param(data);
    const path = '';
    const urlPath = (Object.keys(data).length > 0) ? `${urlLink}?${path}` : urlLink;
    formData.append(file_key, file, file.name);
    const url = `${ApiHandlerService.API_BASE_URL}${urlPath}`;
    ApiHandlerService.API_BASE_URL = environment.API_BASE_URL;

    return this.http.post<Blob>(url, (formData || {})).pipe(
      retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
    ).pipe(
      catchError((err) => this.errorHandler(err))
    ).pipe(
      map((res) =>{
      ApiConfig.EXPECT_FILE = null;
        return res['body'];
      }
       )
    )
  }

 


  /**
   * This is used catch error
   * @param err
   * @returns {any}
   */
  private errorHandler(err) {
    this.checkLogout(err);
    try{
      return Observable.throw(err || 'Server error');
    }catch(e){
      return Observable.from([ ])
    }

  }

  /**
   * 
   * @param err 
   */
  private checkLogout = (err) => {

    const { status } = err;
    if(status == CONSTANTS.HTTP_STATUS_FORBIDDEN || status == CONSTANTS.HTTP_STATUS_UNAUTHENTICATED){
      const logoutMsg = status == CONSTANTS.HTTP_STATUS_FORBIDDEN ? "Access forbidden":"Session Expired"
      this.authService.logoutUser();
      this.toastr.error(`${logoutMsg}! Please login again.`);
    }
  }

  // EXTERNAL CALLS

  /**
   *
   * This is used to make get requests outside the portal
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
   public ext_get(url: string): Observable<any> {
    return this.http.get(url, this.headers).pipe(
      retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
    ).pipe(
      catchError((err) => this.errorHandler(err))
    ).pipe(
      map((res) => {
        return res['body'];
      })
      )
  }


}



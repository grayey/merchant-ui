import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CONSTANTS  from '../../utils/constants';
import { IBearerToken } from "../../interfaces/bearer-token.interface";
import { AuthService } from "../auth.service";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {

  constructor(private router: Router, private authService:AuthService) {

  }


  /**
   * This method returns the active user's login state
   */
  public isLoggedIn():boolean{
    return true;
  }



  /**
   * This method returns the logged in user's jwt token
   */
  public getAuthUserToken(requestUrl=''):string{
    const bearerToken:IBearerToken = {
      access_token:""
    }
    const accessToken = this.authService.user;
    Object.assign(bearerToken, accessToken);

    return requestUrl.endsWith('oauth/token') ? environment.BASIC_TOKEN : "Bearer " + bearerToken.access_token;
  }


  /**
   * This is used to set authenticated user object into cache.
   * @param user
   */
  public setAuthUser(user: any): void {
    // console.log('Auth User ', user);

  }


    /**
   * This is used to get authenticated user object from cache
   */
  public getAuthUser() {
    const authUser = localStorage.getItem('userData');
    return authUser ? JSON.parse(authUser) : null;
  }

    /**
   * This is used to delete Authenticated user from Cache.
   */
  private removeAuthUser(): void {
    // clear token from cache;
    // clear auth user from cache;

  }

     /**
   * This is used to get authenticated user tasks from cache
   */
      public getAuthUserTasks() {
        return JSON.parse(localStorage.getItem('USER_TASKS'));
      }
    


  /**
   * This logs a user out of the current browser session
   * @param type
   * @param message
   * @returns {null}
   */
  public logout(type?: String, message?: string) {
    let redirectUrl = '';
    switch (type) {
      case CONSTANTS.TOKEN_EXPIRED:
        message = message || 'Your session expired. Please login again to continue.'
        redirectUrl = '/login';
        break;
      case CONSTANTS.USER_UNAUTHORIZED:
        message = message || 'Permission denied: login again.'
        redirectUrl = '/login';
        break;
      default:
        break;
    }
    this.removeAuthUser();
    this.router.navigateByUrl(redirectUrl);

  }

  private getToken(): string {
    // let bearerToken: IBearerToken = this.initEmptyData();
    // const accessToken = this.authService.user;
    // Object.assign(bearerToken, accessToken);
    // let token = "Bearer " + bearerToken.access_token;
    // return token;
    return ''
  }

}

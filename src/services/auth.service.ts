import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppService } from "./app.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthService {
  private isAuthenticated: boolean;
  private tokenExpirationTimer: any;
  public user = null;
  expiresIn = 360000;

  constructor(private http: HttpClient, private router: Router, private toastr:ToastrService) {}

  public isRouteAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
  }

  public performLogin(user, callBack:any = null) {
    this.loginUser(user, callBack);
    callBack && new Promise(resolve => resolve(callBack()));
  }

  loginUser(user, reroute = true) {
    this.autoLogout(this.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
    this.user = user;
    this.isAuthenticated = true;
    reroute && this.router.navigateByUrl('/transactions');
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user = null;
    localStorage.removeItem("userData");
    this.tokenExpirationTimer && clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
    this.isAuthenticated = false;
  }

  logoutUser(INACTIVE_INTERVAL?:number) {
    INACTIVE_INTERVAL && clearInterval(INACTIVE_INTERVAL);
    this.logout();
    this.router.navigate(["/login"]);
  }

  
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private isAuthenticated: boolean;
  private tokenExpirationTimer: any;
  public user = null;
  expiresIn = 360000;

  constructor(private http: HttpClient, private router: Router) {}

  public isRouteAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
  }

  public performLogin(user) {
    this.loginUser(user);
  }

  loginUser(user) {
    this.autoLogout(this.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
    this.user = user;
    this.isAuthenticated = true;
    this.router.navigate(["/transactions"]);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user = null;

    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.isAuthenticated = false;
  }

  logoutUser() {
    this.logout();
    this.router.navigate(["/login"]);
    // const INACTIVE_INTERVAL = localStorage.getItem('INACTIVE_INTERVAL');
    // const interval = INACTIVE_INTERVAL ? +INACTIVE_INTERVAL : null;
    // console.log({interval}, 'cleared')
    // clearInterval(interval);
    // localStorage.setItem('INACTIVE_INTERVAL','')
  }
}

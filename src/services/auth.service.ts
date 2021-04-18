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
    if(callBack){
     const getUserRoleAndLogin = new Promise(resolve => resolve(callBack()));
    //  getUserRoleAndLogin.then((response) =>{
    //   console.log("CALLBACK SUCCESS");
    //   // this.router.navigateByUrl('/transactions');
    //  }).catch((err) =>{
    //   console.log("CALLBACK ERROR", { err });
    //  })
   
    }
  }

  loginUser(user, reroute = true) {
    this.autoLogout(this.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
    this.user = user;
    this.isAuthenticated = true;
    if(reroute == true) this.router.navigateByUrl('/transactions');
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

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/services/app.service";
import { AuthService } from "src/services/auth.service";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import {  processErrors } from 'src/utils/helpers';
import { environment } from "src/environments/environment";
import { ApiHandlerService } from "src/services/api-handler.service";



@Component({
  selector: "fury-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeInUpAnimation],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  inputType = "password";
  visible = false;
  lockoutInfo:any; //{locked_out:boolean; ip_address:string}
  loginAttempts:number = 0;
  lockoutWarning:string;
  TIMEOUT;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private appService: AppService,
    private authService: AuthService,
    private toastr: ToastrService,
    private apiService: ApiHandlerService,
  ) {
    
    const user = localStorage.getItem("userData");
    let lockoutInfo = localStorage.getItem("LOCKOUT_INFO") || "{}";
    lockoutInfo = JSON.parse(lockoutInfo);
    if(!lockoutInfo){
      this.getClientIp();
    }else{
      this.lockoutInfo = lockoutInfo;
    }
    if (user) {
      const userData = JSON.parse(user);
      this.authService.loginUser(userData);
    }


    // const INACTIVE_INTERVAL = localStorage.getItem('INACTIVE_INTERVAL');
    // const interval = INACTIVE_INTERVAL ? +INACTIVE_INTERVAL : null;
    // console.log({interval}, 'cleared')
    // clearInterval(interval);
    // localStorage.setItem('INACTIVE_INTERVAL','')
  }
  
  /**
   * 
   */
  public loaders = {
    processing:false
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  
  }

  send() {
    this.login(this.form.value);

    // this.router.navigate(["/"]);
    // this.snackbar.open(
    //   "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
    //   "LOL THANKS",
    //   {
    //     duration: 10000,
    //   }
    // );
  }

  public async getUserRoleById(user){
    const { roleId } = user;
    return this.appService.getUserRoleById(roleId).subscribe(
        (roleResponse) => {
          console.log({ roleResponse });
          const { roleFunctionsJson } = roleResponse.data;
          const userTasks = roleFunctionsJson || "[]";
          localStorage.setItem('USER_TASKS', userTasks);
          this.router.navigateByUrl('/transactions');
          localStorage.setItem("LOCKOUT_INFO","")

          // this.authService.performLogin(user);
        },
        (error) => {
          this.loaders.processing = false;
          this.toastr.error(`Could not resolve system permissions`);

        });

  }

  private login(data: any) {
  
    this.loginAttempts +=1;
    const now = new Date();
    const expire_at = new Date(this.lockoutInfo?.expire_at);
    const difference = expire_at.getTime() - now.getTime();
    const minutesDifference = Math.ceil(difference/1000/60);
    if(this.lockoutInfo?.locked_out && (expire_at > now)){
      this.toastr.error(`You were temporarily locked out! Try again in ${minutesDifference.toString()} minutes.`)
      return;
    }
    const { username, password } = data;
    this.loaders.processing = true;
    this.appService.loginUser(username, password).subscribe(
      (response) => {
        const user = response;
        this.authService.performLogin(user, () => {
          this.getUserRoleById(user)
        })
        // this.loaders.processing = false;
      },
      (err) => {
        this.loaders.processing = false;
        // this.toastr.error(processErrors(err));
        if (err.status == 400) {
          let tosterMsg = "Invalid Username or Password";
          this.lockoutWarning = `${environment.MAX_LOGIN_ATTEMPTS - this.loginAttempts} attempts remaining.`
          if(this.loginAttempts == environment.MAX_LOGIN_ATTEMPTS){
            this.lockoutInfo.locked_out = true;
            let now = new Date();
            now.setMinutes(now.getMinutes() + environment.LOCKOOUT_MINUTES); // timestamp add LOCKOUT minutes
            this.lockoutInfo.expire_at = now;
            localStorage.setItem("LOCKOUT_INFO",JSON.stringify(this.lockoutInfo));
            tosterMsg += `. You have been locked out for ${environment.LOCKOOUT_MINUTES.toString()} minutes due to ${this.loginAttempts.toString()} wrong attempts!`;
          }
          this.toastr.error(tosterMsg);
          clearTimeout(this.TIMEOUT)
          this.TIMEOUT = setTimeout(() => {
            this.lockoutWarning = "";
          }, 2000);
        } else {
          this.toastr.error("Sorry something went wrong");
        }
      },
      () => {
        console.log('save enrolle call completed!');
      }
    );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  private getClientIp = () => {
    const { IPIFY_URL } = environment;
    this.apiService.ext_get(IPIFY_URL).subscribe(
      (ipResponse) =>{
        const { ip_address } = ipResponse;
        const lockoutInfo = {
          locked_out:false,
          ip_address
        }
        localStorage.setItem("LOCKOUT_INFO",JSON.stringify(lockoutInfo))
        this.lockoutInfo = lockoutInfo;
       
    },
    (error) =>{
      console.log({ error })
    })


  }

  ngOnDestroy(){
    clearTimeout(this.TIMEOUT)
  }
}

import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/services/app.service";
import { AuthService } from "src/services/auth.service";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import {  processErrors } from 'src/utils/helpers';


@Component({
  selector: "fury-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeInUpAnimation],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  inputType = "password";
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private appService: AppService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    const user = localStorage.getItem("userData");
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

  private login(data: any) {
    const { username, password } = data;
    this.loaders.processing = true;
    this.appService.loginUser(username, password).subscribe(
      (response) => {
        const user = response;
        // this.loaders.processing = false;
        this.authService.performLogin(user);
      },
      (err) => {
        console.log("Could not login because of wrong credentials", err);
        this.loaders.processing = false;
        // this.toastr.error(processErrors(err));
        if (err.status == 400) {
          this.toastr.error("Invalid Username or Password");
        } else {
          this.toastr.error("Sorry something went wrong");
        }
      },
      () => {
        // console.log('save enrolle call completed!');
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
}

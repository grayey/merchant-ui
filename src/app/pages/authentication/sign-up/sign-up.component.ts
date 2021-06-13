import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { processErrors } from 'src/utils/helpers';



@Component({
  selector: 'fury-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public loaders ={
    processing:false
  }

  private static signUpForm = () =>{

    return {
      email:["", Validators.compose([Validators.required, Validators.email])]
    }
  }

  constructor(
    private fb:FormBuilder,
    private merchantService:MerchantService,
    private toasterService:ToastrService,
   
  ) {
    this.signUpForm = this.fb.group(SignUpComponent.signUpForm())
   }

  ngOnInit(): void {
  }

  public generateOTP = () =>{
    const { email } = this.signUpForm.value;
    const callbackUrl = `${environment.FRONT_END_URL}/merchant-validate`;
    this.loaders.processing = true;
    this.merchantService.generateOTP({ email, callbackUrl }).subscribe(
      (otpResponse) => {
        console.log({
          otpResponse
        })
        this.toasterService.success(`Please check your email in order to complete verification.`);
        this.loaders.processing = false;

      },
      (error) =>{
        this.toasterService.error(processErrors(error));
        this.loaders.processing = false;

      },
      )
  }

}

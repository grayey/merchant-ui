import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { MerchantService } from 'src/services/merchant/merchant.service';


@Component({
  selector: 'fury-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.scss']
})
export class MerchantCreateComponent implements OnInit {

  merchantDetailsForm:FormGroup;
  merchantContactForm:FormGroup;
  OTPForm:FormGroup;
  previewForm:FormGroup;
  previewData:any;
  
  public merchantRegistered:boolean = false;
  public registrationVerifiied:boolean = false;

  public loaders = {
    registering:false,
    verifying:false
  }

  phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

  passwordInputType = 'password';

  private static merchantDetailsForm = () => {
    return {
      companyName: ['', Validators.compose([Validators.required])],
      businessCategoryId: ['', Validators.compose([Validators.required])],
      bankId: ['', Validators.compose([Validators.required])],
      accountNumber: ['', Validators.compose([Validators.required])],
      agid: ['', Validators.compose([Validators.required])],
      businessYears: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      merchantCode: ['', Validators.compose([Validators.required])],
      callbackUrl: ['', Validators.compose([Validators.required])],
    }
  }

  private static merchantContactForm = () => {
    return {
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      primaryContactEmail: ['', Validators.compose([Validators.required])],
      primaryContactName: ['', Validators.compose([Validators.required])],
      primaryContactPhoneNumber: ['', Validators.compose([Validators.required])],
      primaryContactTelephone: ['', Validators.compose([Validators.required])],
      secondaryContactEmail: ['', Validators.compose([Validators.required])],
      secondaryContactName: ['', Validators.compose([Validators.required])],
      secondaryContactTelephone: ['', Validators.compose([Validators.required])],
      websiteLink: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
    }
  }

  private static OTPForm = () => {
    return {
      otp: ['', Validators.compose([Validators.required])]
    }

  }

  private static previewForm = () => {
    return {
      authorize: ['', Validators.compose([Validators.required])]
    }

  }

  


  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private merchantService: MerchantService) {
                this.merchantDetailsForm = this.fb.group(MerchantCreateComponent.merchantDetailsForm())
                this.merchantContactForm = this.fb.group(MerchantCreateComponent.merchantContactForm())
                this.OTPForm = this.fb.group(MerchantCreateComponent.OTPForm());
                this.previewForm = this.fb.group(MerchantCreateComponent.previewForm());
                this.previewData = {};
  }

  ngOnInit() {
   
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open('Hooray! You successfully created your account.', null, {
      duration: 5000
    });
  }

  /**
   * This method registers a merchant
   */
  registerMerchant = () => { 
    if(this.merchantRegistered){
      document.getElementById('register-merchant').click();
      return;
    }

    const fake = {
      "transactionDescription": "string",
      "transactionRef": "string",
      "api_AUTH_DATA_JSON":"string"
    }
    const registrationData = { ...this.merchantDetailsForm.value, ...this.merchantContactForm.value, ...fake };
    
    //remove this later when api adjusts
    registrationData.bankType = registrationData.bankId;
    registrationData.businessType = registrationData.businessCategoryId;
    delete registrationData.bankId;
    delete registrationData.businessCategoryId;

    this.loaders.registering = true;
    
    this.merchantService.registerMerchant(registrationData).subscribe(
      (registrationResponse) =>{
       this.loaders.registering = false;
        this.merchantRegistered = true;
        document.getElementById('register-merchant').click();
        this.generatePreview(registrationData);
        console.log({ registrationResponse })
      },
      (error) =>{
       this.loaders.registering = false;
        alert('Errorooror')
      }
    )

  }


  /**
   * This method verifies a merchant's registration
   */
  verifyRegistration = () => {
    if(this.registrationVerifiied){
      document.getElementById('verify-registration').click();
      return;
    }
    const fake = {
    "agid": "string",
    "api_AUTH_DATA_JSON": "string",
    "email": "test1@codeiq.com",
    "password": "string",
    "transactionDescription": "string"
    }
    const verificationData = {...this.OTPForm.value, ...fake }
    this.loaders.verifying = true;

    this.merchantService.verifyRegistration(verificationData).subscribe(
      (verificationResponse) =>{
      this.loaders.verifying = false;
      this.registrationVerifiied = true;
      document.getElementById('verify-registration').click();
        console.log({ verificationResponse })
      },
      (error) =>{
      this.loaders.verifying = false;
        alert('Errorooror')
      }
    )

  }

  /**
   * This method generates the preview for the last tab
   */
  private generatePreview = (data) =>{
    const getBankName = (bankId) => {
      return bankId;
    }
    const getBusinessCategory = (categoryId) => {
      return categoryId;
    }
    const previewData = {...data, bankName:getBankName(data.bankId), businessCategoryName:getBusinessCategory(data.businessCategoryId) };
    //do something

    this.previewData = previewData;
  
  }

}

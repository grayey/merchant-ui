import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { AppService } from 'src/services/app.service';
import { IMerchantFeeInfo, IMerchantProcessingGatewayAppInfo, IMerchantUser } from "src/interfaces/merchant.interface";
import { getToday, processErrors } from 'src/utils/helpers';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'fury-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.scss']
})
export class MerchantCreateComponent implements OnInit {

  merchantDetailsForm:FormGroup;
  merchantContactForm:FormGroup;
  authenticationForm:FormGroup;
  OTPForm:FormGroup;
  previewForm:FormGroup;
  encryptionForm:FormGroup;
  feeSetUpForm:FormGroup;
  merchantUserForm:FormGroup;
  mergedData:any;
  previewData:any;
  registrationData:any;
  completeRegistrationData:any;

  
  public merchantRegistered:boolean = false;
  public registrationVerifiied:boolean = false;
  public allBanks:any[] = [];
  public allBusinessCategories:any[] = [];
  public allGateways:any[] = [];
  public allCountries:any[] = [];

  public allCurrencies:any[] = [];
  public allRegions:any[] = [];
  public userRoles:any[] = [];
  public userTypes:any[] = [];

  public today = getToday();

  public loaders = {
    registering:false,
    verifying:false,
    creating:false
  }


  passwordInputType = 'password';

  private static merchantDetailsForm = () => {
    return {
      companyName: ['', Validators.compose([Validators.required])],
      businessCategoryId: ['', Validators.compose([Validators.required])],
      bankId: ['', Validators.compose([Validators.required])],
      countryId: ['', Validators.compose([Validators.required])],
      processingGatewayId: ['', Validators.compose([])],
      city: ['', Validators.compose([Validators.required])],
      accountNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      agid: ['', Validators.compose([Validators.required])],
      businessYears: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      region: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      merchantCode: ['', Validators.compose([Validators.required])],
      // callbackUrl: ['', Validators.compose([Validators.required])], obsolete available in authentication form
    }
  }

  private static merchantContactForm = () => {
    return {
      email: ['', Validators.compose([Validators.required, Validators.email])],
      developerEmailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      developerMobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      primaryContactEmail: ['', Validators.compose([Validators.required])],
      primaryContactName: ['', Validators.compose([Validators.required])],
      primaryContactPhoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      primaryContactTelephone: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      secondaryContactEmail: ['', Validators.compose([Validators.required])],
      secondaryContactName: ['', Validators.compose([Validators.required])],
      secondaryContactPhoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      secondaryContactTelephone: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
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

  private static authenticationForm = () => { //AuthData
    return {
      applicationId: ['', Validators.compose([Validators.required])],
      apiKey: ['', Validators.compose([Validators.required])],
      callbackUrl: ['', Validators.compose([Validators.required])],
      initVector: ['', Validators.compose([Validators.required])],
      key: ['', Validators.compose([Validators.required])],
      registerMerchantUrl: ['', Validators.compose([Validators.required])],
      url: ['', Validators.compose([Validators.required])],
    }
  }

  
  private static encryptionForm = () => { //AESCONFIG

    return {
      cipherTransformation: ['', Validators.compose([Validators.required])],
      iterationCount: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      iv: ['', Validators.compose([Validators.required])],
      keySize: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      salt: ['', Validators.compose([Validators.required])],

      aesKey: ['', Validators.compose([Validators.required])],
      // applicationId: ['', Validators.compose([Validators.required])],  obsolete appears in authentication info
      expiryDate: ['', Validators.compose([Validators.required])],
      ivKey: ['', Validators.compose([])] // maybe its the same as iv
    }

  }
  
  private static feeSetUpForm = () => { 

    return {
      bank_mdr_commission: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      mdrFee: ['', Validators.compose([Validators.required])],
      mdrFeeValueType: ['', Validators.compose([Validators.required])],
      platform_mdr_commission: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      transactionFee: ['', Validators.compose([Validators.required])],
      transactionFeeValueType: ['', Validators.compose([Validators.required])] 
    }
  }

  private static merchantUserForm = () => {
     return {
      fullName: ['', Validators.compose([Validators.required])],
      //merchantId: ['', Validators.compose([])], obsolete appears merchant Id not available
      password: ['', Validators.compose([Validators.required])],
      // processingGatewayId:['', Validators.compose([Validators.required])], obsolete appears in merchant details
      userRoleId: ['', Validators.compose([Validators.required])],
      userTypeId: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
     }
  }


  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private merchantService: MerchantService,
              private appService: AppService,
              private toastr: ToastrService,
              private router: Router) {
                this.merchantDetailsForm = this.fb.group(MerchantCreateComponent.merchantDetailsForm())
                this.merchantContactForm = this.fb.group(MerchantCreateComponent.merchantContactForm())
                this.OTPForm = this.fb.group(MerchantCreateComponent.OTPForm());
                this.previewForm = this.fb.group(MerchantCreateComponent.previewForm());
                this.authenticationForm = this.fb.group(MerchantCreateComponent.authenticationForm());
                this.feeSetUpForm = this.fb.group(MerchantCreateComponent.feeSetUpForm());
            
                this.merchantUserForm = this.fb.group(MerchantCreateComponent.merchantUserForm());
                this.encryptionForm = this.fb.group(MerchantCreateComponent.encryptionForm());
                this.previewData = {};
  }

  ngOnInit() {
    this.getAllBanks();
    this.getAllBusinessCategories();
    this.getAllCountries();
    this.getAllGateways();
    
    this.getAllCurrencies();
    this.getAllRegions();
    this.getUserRoles();
    this.getUserTypes();
   
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
   
     this.registrationData = { ...this.merchantDetailsForm.value, ...this.merchantContactForm.value,
      //  authData: { ...this.authenticationForm.value } 
      };
       this.registrationData.applicationID = this.registrationData.agid //because of applicationID/agid mismatch error
    this.loaders.registering = true;
    this.merchantService.registerMerchant(this.registrationData).subscribe(
      (registrationResponse) =>{
       this.loaders.registering = false;
        this.merchantRegistered = true;
        document.getElementById('register-merchant').click();
        this.toastr.success('Please enter the OTP sent to you.')
        console.log({ registrationResponse })
      },
      (error) =>{
      //  document.getElementById('register-merchant').click();// remove later
       this.loaders.registering = false;
       this.toastr.error(processErrors(error))


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
   
    const { password } = this.merchantUserForm.value;
    const { agid, processingGatewayId } = this.merchantDetailsForm.value;
    const { email } = this.merchantContactForm.value;

    const verificationData = {...this.OTPForm.value, processingGatewayId,  email, password, agid }
    this.loaders.verifying = true;

    this.merchantService.verifyRegistration(verificationData).subscribe(
      (verificationResponse) =>{
      this.loaders.verifying = false;
      this.registrationVerifiied = true;
      document.getElementById('verify-registration').click();
      this.completeRegistrationData = this.getCompleteRegistrationData();
      this.generatePreview();
        // console.log({ verificationResponse })
      },
      (error) =>{
      this.loaders.verifying = false;
      this.toastr.error(processErrors(error))

      }
    )

  }

  /**
   * This method completes a merchant's registration
   */
   completeMerchantRegistration = () => {
     this.loaders.creating = true;
    this.merchantService.completeMerchantRegistration(this.completeRegistrationData).subscribe(
      (completionResponse)=> {
     this.loaders.creating = false;
     const { companyName } = this.merchantDetailsForm.value;
     this.toastr.success(`${companyName} successfully registered.`);
     this.router.navigateByUrl('/merchants');

        console.log({ completionResponse })
      },
      (error)=>{
        this.loaders.creating = false;
        this.toastr.error(processErrors(error))
      })

   }

  /**
   * 
   * This method retrieves a list of all banks
   */

  private getAllBanks = () => {
    
    this.merchantService.getAllBanks().subscribe(
      (banksResponse) =>{
        this.allBanks = banksResponse.data;
      },
      (error) =>{
        console.log('Could not load banks');
      }
    )

  }

    /**
   * 
   * This method retrieves a list of all regions
   */

     private getAllRegions = () => {
    
      this.merchantService.getAllRegions().subscribe(
        (regionsResponse) =>{
          this.allRegions = regionsResponse.data;
        },
        (error) =>{
          console.log('Could not load regions');

        }
      )
  
    }

        /**
   * 
   * This method retrieves a list of all currencies
   */

         private getAllCurrencies = () => {
          this.merchantService.getAllCurrencies().subscribe(
            (currenciesResponse) =>{
              this.allCurrencies = currenciesResponse.data;
            },
            (error) =>{
              console.log('Could not load currencies');

            }
          )
      
        }
  
  /**
   * 
   * This method retrieves a list of all business categories
   */

   public getAllBusinessCategories = () => {
    
    this.merchantService.getAllBusinessCategories().subscribe(
      (businessCategoriesResponse) =>{
        this.allBusinessCategories = businessCategoriesResponse.data;
      },
      (error) =>{
      this.loaders.verifying = false;
      console.log('Could not load categories');

      }
    )
  }

   /**
   * 
   * This method retrieves a list of all countries
   */

    private getAllCountries = () => {
    
      this.merchantService.getAllCountries().subscribe(
        (countriesResponse) =>{
          this.allCountries = countriesResponse.data;
        },
        (error) =>{
        this.loaders.verifying = false;
        console.log('Could not load countries');
  
        }
      )
    }

     /**
   * 
   * This method retrieves a list of all processing gateways
   */

   public getAllGateways = () => {
    
    this.merchantService.getAllProcessingGateways().subscribe(
      (gatewaysResponse) =>{
        this.allGateways = gatewaysResponse.data;
      },
      (error) =>{
      console.log('Could not load gateqays');

      }
    )
  }

  /**
   * this method lists user roles
   */
  private getUserRoles() {
    this.appService.getUserRoles().subscribe(
      (response) => {
        this.userRoles = response.data;
      },
      (err) => {},
      () => {}
    );
  }

  /**
   * This method lists user types
   */
  private getUserTypes() {
    this.appService.getUserTypes().subscribe(
      (response) => {
        this.userTypes = response.data;
        console.log(this.userTypes);
      },
      (err) => {},
      () => {}
    );
  }
  /**
   * This method generates the preview for the last tab
   */
  private generatePreview = () =>{

    const getBankName = (bankId) => {
      return this.allBanks.find((bank) => bank.id == bankId)?.name;
    }
    const getBusinessCategoryName = (categoryId) => {
      return this.allBusinessCategories.find((category) => category.id == categoryId)?.name;
    }
    const getGatewayName = (gatewayId) => {
      return this.allGateways.find((gateway) => gateway.id == gatewayId)?.name;
    }
    const getCountryName = (countryId) => {
      return this.allCountries.find((country) => country.id == countryId)?.name;
    }
    const getUserRoleName = (roleId) => {
      return this.userRoles.find((role) => role.id == roleId)?.name;
    }
    const getUserTypeName = (typeId) => {
      return this.userTypes.find((userType) => userType.id == typeId)?.name;
    }
    const getCurrencyName = (currencyKey) => {
      return this.allCurrencies.find((currency) => currency.key == currencyKey)?.value;
    }
    const getRegionName = (regionKey) => {
      return this.allRegions.find((region) => region.key == regionKey)?.value;
    }
    const data = {...this.mergedData};
    this.previewData  = {...data,
    bankName:getBankName(data.bankId), businessCategoryName:getBusinessCategoryName(data.businessCategoryId),
    countryName:getCountryName(data.countryId), gatewayName:getGatewayName(data.processingGatewayId),
    userRoleId:getUserRoleName(data.userRoleId), userTypeId:getUserTypeName(data.userTypeId), currency:getCurrencyName(data.currency),
    region:getRegionName(data.region)};
    //do something
  
  }

  private getCompleteRegistrationData = () => {
    const mergedData = {
      ...this.registrationData,
      ...this.OTPForm.value,
      ...this.encryptionForm.value,
      ...this.feeSetUpForm.value,
      ...this.merchantUserForm.value,
      ...this.merchantContactForm.value
    };

    this.mergedData = { ...mergedData };
    const { authData } = mergedData;
    mergedData.authData = undefined; // same as delete 
    const { merchantCode } = this.merchantDetailsForm.value;

    const merchantFeeInfo:IMerchantFeeInfo = { ...this.feeSetUpForm.value };

    const merchantInfo = {...this.merchantUserForm.value, ...this.merchantContactForm.value, ...this.merchantDetailsForm.value,
       code: merchantCode, ...authData, aesConfig:this.encryptionForm.value, mobileNumber:mergedData.phoneNumber, name:mergedData.companyName,
    };

    const merchantProcessingGatewayAppInfo:IMerchantProcessingGatewayAppInfo = {
      applicationId:authData.applicationId,
      ivKey:mergedData.iv,
      aesKey:mergedData.aesKey,
      expiryDate:mergedData.expiryDate,
    };
 
    const portalUserInfo:IMerchantUser = {
      ...this.merchantUserForm.value,
      processingGatewayId:mergedData.processingGatewayId
    }

   return {
    merchantFeeInfo,
    merchantInfo,
    merchantProcessingGatewayAppInfo,
    portalUserInfo
   };

  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';


@Component({
  selector: 'fury-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.scss']
})
export class MerchantCreateComponent implements OnInit {
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  merchantDetailsForm:FormGroup;
  merchantContactForm:FormGroup;
  OTPForm:FormGroup;
  previewForm:FormGroup;

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
  // "accountNumber": "string",
  // "address": "string",
  // "agid": "string",
  // "bankType": "string",
  // "businessType": "string",
  // "businessYears": "string",
  // "callbackUrl": "string",
  // "companyName": "string",
  // "currency": "string",
  // "email": "string",
  // "merchantCode": "string",
  // "phoneNumber": "string",
  // "primaryContactEmail": "string",
  // "primaryContactName": "string",
  // "primaryContactPhoneNumber": "string",
  // "primaryContactTelephone": "string",
  // "region": "string",
  // "secondaryContactEmail": "string",
  // "secondaryContactName": "string",
  // "secondaryContactTelephone": "string",
  // "websiteLink": "string"

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar) {
                this.merchantDetailsForm = this.fb.group(MerchantCreateComponent.merchantDetailsForm())
                this.merchantContactForm = this.fb.group(MerchantCreateComponent.merchantContactForm())
  }

  ngOnInit() {
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */
    this.accountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: [],
    });

    this.passwordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(6)
          ]
        )
      ],
      passwordConfirm: [null, Validators.required]
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });

   
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

}

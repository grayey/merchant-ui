import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { processErrors } from 'src/utils/helpers';



@Component({
  selector: 'fury-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.scss']
})
export class MerchantUpdateComponent implements OnInit {

  merchantDetailsForm:FormGroup;
  

  constructor(private fb: FormBuilder,
    private merchantService: MerchantService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editedMerchant: any, private dialogRef: MatDialogRef<MerchantUpdateComponent>,) { 
    this.merchantDetailsForm = this.fb.group(MerchantUpdateComponent.merchantDetailsForm())

  }

  ngOnInit(): void {
    this.getAllBanks();
    this.getAllBusinessCategories();
    this.getAllCountries();
    this.getAllGateways();
    const { developerMobile } = this.editedMerchant;
    this.merchantDetailsForm.patchValue({ ...this.editedMerchant, developerMobileNumber:developerMobile });
      // console.log('DEFAULTS', this.editedMerchant)

  }

  public allBanks:any[] = [];
  public allBusinessCategories:any[] = [];
  public allGateways:any[] = [];
  public allCountries:any[] = [];
  public loaders = {
    registering:false,
    verifying:false,
    updating:false
  }

  private static merchantDetailsForm = () => {
    return {
      merchantName: ['', Validators.compose([Validators.required])],
      businessCategoryId: ['', Validators.compose([Validators.required])],
      bankId: ['', Validators.compose([Validators.required])],
      countryId: ['', Validators.compose([Validators.required])],
      processingGatewayId: ['', Validators.compose([])],
      city: ['', Validators.compose([Validators.required])],
      developerEmail: ['', Validators.compose([Validators.required, Validators.email])],
      developerMobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
      accountNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]\d*$/)])],
     
    }
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
      
      let { countryId, countryName } = this.editedMerchant;
      this.merchantService.getAllCountries().subscribe(
        (countriesResponse) =>{
          this.allCountries = countriesResponse.data;
          countryId =  this.allCountries.find(country => country.name == countryName)?.id || countryId;
          this.merchantDetailsForm.patchValue({ countryId })
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
   * This method updates a merchant's portal info
   */
  public updateMerchant(){
    const { merchantId, status } = this.editedMerchant;
    const merchantObject = {
      ...this.merchantDetailsForm.value, merchantId, status
    }
    this.loaders.updating = true;
    this.merchantService.updateMerchant(merchantObject).subscribe(
      (merchantUpdateResponse) =>{
        this.loaders.updating = false;
        this.toastr.success(`${this.merchantDetailsForm.value?.merchantName} successfully updated.`)
        this.toggleModal();
      },
      (error) =>{
      this.loaders.updating = false;
        this.toastr.error(`${processErrors(error)}`)
      }
    )
  }

  public toggleModal = (action='close') =>{
    if(['close', 'open'].includes(action)) this.dialogRef[action]();
  }

}

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/services/app.service";
import { UserService } from "src/services/user/user.service";
import { formatDateHelper } from "src/utils/helpers";

@Component({
  selector: "filter-dropdown",
  templateUrl: "./filter-dropdown.component.html",
  styleUrls: ["./filter-dropdown.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FilterDropdownComponent implements OnInit {
  form: FormGroup;
  public dateTimeFormGroup:FormGroup;

  @Input() showType = false;
  @Input() showStatus = false;
  @Input() fullName = false;
  @Input() username = false;
  @Input() gatewayTransactionReference = false;
  @Input() transactionStatus = false;
  @Input() amount = false;
  @Input() merchantTransactionReference = false;
  @Input() transactionDate = false;
  @Input() merchantId = false;
  @Input() reportType = false;
  @Input() startDate = false;
  @Input() endDate = false;

  @Output() filterClick: EventEmitter<any> = new EventEmitter<any>();

  uploadStatuses = [];
  reportTypes = [];
  types = [];
  merchants = [];
  
  appUser;
  isAdmin;
  today;
  model: NgbDateStruct;

  constructor(private fb: FormBuilder, private appService: AppService, private userService:UserService) {
    this.appUser = this.userService.getAuthUser();
    // console.log("APP USER", this.appUser)
    this.isAdmin = (this.appUser && !this.appUser.merchantId);
    this.today = new Date().toISOString()?.split('T')[0];
    this.dateTimeFormGroup = new FormGroup({
      activeEndDate: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.initForm();
    this.getUploadStatuses();
    if(this.isAdmin){
      this.getMerchants();
    }
    this.getReportTypes();
    this.types = [
      {
        name: "SETTLEMENT",
      },
      {
        name: "CHARGE_BACKS",
      },
    ];

   
  }

  private initForm(): void {

  

    this.form = this.fb.group({
      status: [""],
      type: [""],
      fullName: [""],
      username: [""],
      gatewayTransactionReference: [""],
      amount: [""],
      merchantTransactionReference: [""],
      transactionStatus: [""],
      transactionDate: [""],
      startDate: [""],
      endDate: [""],
      merchantId: [""],
      reportType: [""],
    });
  }

  private getUploadStatuses() {
    this.appService.getUploadStatuses().subscribe(
      (response) => {
        this.uploadStatuses = response.data;
        console.log(this.uploadStatuses);
      },
      (err) => {},
      () => {}
    );
  }

  private getMerchants() {
    this.appService.getMerchants().subscribe(
      (response) => {
        this.merchants = response.data;
      },
      (err) => {},
      () => {}
    );
  }

  private getReportTypes() {
    this.appService.getReportTypes().subscribe(
      (response) => {
        this.reportTypes = response.data;
      },
      (err) => {},
      () => {}
    );
  }

  // private getUpload() {
  //   this.appService.getUserTypes().subscribe(
  //     (response) => {
  //       this.userTypes = response.data;
  //       console.log(this.userTypes);
  //     },
  //     (err) => {},
  //     () => {}
  //   );
  // }

  clearFilterFields(): void {
    this.form.reset();
  }

  formatDate(date) {
    // let formatedDate = "";
    // let { day, month, year } = date;
    // // day = date.getDay();
    // // year = date.getYear();
    // console.log(formatDateHelper(date))
    // if(day && month && year){
    //   formatedDate =
    //   year.toString() + "-" + month.toString() + "-" + day.toString();
    // }
    
    return formatDateHelper(date);
  }

  onSubmit() {
    const payLoad = this.form.value;
    let { startDate, endDate } = payLoad;
    // startDate = startDate ? startDate : this.today;
    // endDate = endDate ? endDate : this.today;
    payLoad.startDate = this.formatDate(startDate);
    payLoad.endDate = this.formatDate(endDate);
    console.log({
      payLoad
    })
    // if (startDate) {
      
    // }else{
    //   payLoad.startDate = this.today;
    // }
    // if (endDate) {
      
    // }else{
    //   payLoad.endDate = this.today;
    // }
    this.filterClick.emit(payLoad);
  }

  onSelect(event) {
    // console.log(event);
    // event.stopPropagation();
    // event.preventDefault();
  }


}

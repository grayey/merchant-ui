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
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/services/app.service";

@Component({
  selector: "filter-dropdown",
  templateUrl: "./filter-dropdown.component.html",
  styleUrls: ["./filter-dropdown.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FilterDropdownComponent implements OnInit {
  form: FormGroup;

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

  model: NgbDateStruct;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.initForm();
    this.getUploadStatuses();
    this.getMerchants();
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
    let formatedDate = "";
    const { day, month, year } = date;
    formatedDate =
      year.toString() + "-" + month.toString() + "-" + day.toString();
    return formatedDate;
  }

  onSubmit() {
    const payLoad = this.form.value;
    const { startDate, endDate } = payLoad;
    if (startDate) {
      payLoad.startDate = this.formatDate(startDate);
    }
    if (endDate) {
      payLoad.endDate = this.formatDate(endDate);
    }
    this.filterClick.emit(payLoad);
  }

  onSelect(event) {
    // console.log(event);
    // event.stopPropagation();
    // event.preventDefault();
  }
}

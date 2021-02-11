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
import { AppService } from "src/app/services/app.service";

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

  @Output() filterClick: EventEmitter<any> = new EventEmitter<any>();

  uploadStatuses: [
    {
      name: "PENDING";
    },
    {
      name: "COMPLETED";
    }
  ];

  types: [
    {
      name: "SETTLEMENT";
    },
    {
      name: "CHARGE_BACKS";
    }
  ];

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      status: [""],
      type: [""],
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

  onSubmit() {
    const payLoad = this.form.value;
    this.filterClick.emit(payLoad);
  }

  onSelect(event) {
    // console.log(event);
    // event.stopPropagation();
    // event.preventDefault();
  }
}

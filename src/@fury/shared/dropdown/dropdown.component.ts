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
  selector: "dropdown",
  templateUrl: "./dropdown.component.html",
  // styleUrls: ["./filter-dropdown.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
  uploadStatuses: [
    {
      name: "PENDING";
    },
    {
      name: "COMPLETED";
    }
  ];

  typesx: [
    {
      name: "SETTLEMENT";
    },
    {
      name: "CHARGE_BACKS";
    }
  ];

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {}
}

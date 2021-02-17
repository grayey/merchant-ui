import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ListColumn } from "./list-column.model";

@Component({
  selector: "fury-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements AfterViewInit {
  @Input() name: string;
  @Input() columns: ListColumn[];

  @Input() showType = false;
  @Input() showStatus = false;
  @Input() fullName = false;
  @Input() username = false;
  @Input() gatewayTransactionReference = false;
  @Input() transactionStatus = false;
  @Input() amount = false;
  @Input() merchantTransactionReference = false;
  @Input() transactionDate = false;
  @Input() showFilter = false;
  @Input() merchantId = false;
  @Input() reportType = false;
  @Input() showDownloadFilter = false;
  @Input() startDate=false;
  @Input() endDate = false;

  @Output() filterClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("filter") filter: ElementRef;
  @Output() filterChange = new EventEmitter<string>();

  @Input() hideHeader: boolean;

  constructor() {}

  ngAfterViewInit() {
    if (!this.hideHeader) {
      fromEvent(this.filter.nativeElement, "keyup")
        .pipe(distinctUntilChanged(), debounceTime(150))
        .subscribe(() => {
          this.filterChange.emit(this.filter.nativeElement.value);
        });
    }
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}

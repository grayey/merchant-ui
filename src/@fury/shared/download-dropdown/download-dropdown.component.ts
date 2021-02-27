import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { AppService } from "src/services/app.service";

@Component({
  selector: "download-dropdown",
  templateUrl: "./download-dropdown.component.html",
  styleUrls: ["./download-dropdown.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DownloadDropdownComponent implements OnInit {
  @Output() downloadClick: EventEmitter<any> = new EventEmitter<any>();
  reportTypes = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getReportTypes();
  }

  download(value: string): void {
    this.downloadClick.emit(value);
  }

  toggled(event) {}

  private getReportTypes() {
    this.appService.getReportTypes().subscribe(
      (response) => {
        this.reportTypes = response.data;
      },
      (err) => {},
      () => {}
    );
  }
}

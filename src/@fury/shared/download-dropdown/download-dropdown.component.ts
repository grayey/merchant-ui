import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'download-dropdown',
  templateUrl: './download-dropdown.component.html',
  styleUrls: ['./download-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DownloadDropdownComponent implements OnInit {
  @Output() downloadClick: EventEmitter<any> = new EventEmitter<any>();
  reportTypes = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getReportTypes();
  }

  private isOpen = '';
  
  toggled(event) {
    if (event) {
        console.log(event);
        this.isOpen = 'is open'
    } else {
      console.log(event);
      this.isOpen = 'is closed'
    }
  }

  download(value: string): void{
    console.log(value);
    this.downloadClick.emit(value);
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

}

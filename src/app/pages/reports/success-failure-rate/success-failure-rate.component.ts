import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
  LOCALE_ID 
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { ListColumn } from "src/@fury/shared/list/list-column.model";
import { ReportsService } from "../../../../services/reports/reports.service";
import { saveAs } from "file-saver/FileSaver";
import { refineData, getToday } from "../../../../utils/helpers";
import { formatCurrency, getCurrencySymbol, formatNumber } from '@angular/common';
import { ISFRFilter } from "src/interfaces/sfr-filter.interface";

@Component({
  selector: 'fury-success-failure-rate',
  templateUrl: './success-failure-rate.component.html',
  styleUrls: ['./success-failure-rate.component.scss'],
  animations: [fadeInUpAnimation,fadeInRightAnimation ]
})
export class SuccessFailureRateComponent implements OnInit, AfterViewInit, OnDestroy {
  transactions = [];
  dataLength: number = 10;
  REPORT = "SFR";

  @Input()
  columns: ListColumn[] = [
    {
      name: "Merchant",
      property: "merchantName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Successful Transactions",
      property: "totalSuccessfulCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Sum of Successful Transactions",
      property: "totalSuccessfulSum",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Failed Transactions",
      property: "totalFailedCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Sum of Failed Transactions",
      property: "totalFailedSum",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Transactions",
      property: "totalTransactionCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total sum of Transactions",
      property: "totalTransactionSum",
      visible: true,
      isModelProperty: true,
    },
  ] as ListColumn[];

  filterData: ISFRFilter ={
    startDate:getToday(),
    endDate:getToday(),
    pageNumber:1,
    pageSize:10
  };
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;
  allSuccessFailureRates:any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private reportService: ReportsService, @Inject(LOCALE_ID) private locale: string) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    // this.setFilterData();
    this.getAllSuccessFailureRates();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

     /**]
     * This methods gets a list of all successFailureRateed transactions
     */
    public getAllSuccessFailureRates = async (pageEvent?: PageEvent) => {
      let { pageNumber, pageSize} = this.filterData;
      if (pageEvent) {
        pageSize = pageEvent.pageSize;
        pageNumber = pageEvent.pageIndex + 1;
      } 
      ReportsService.S_F_RATES_LIST_FILTER = { pageSize, pageNumber, ...this.filterData };
      
      this.reportService.getSuccessFailureRates().subscribe(
          (successFailureRatesResponse)=>{
              const refineSuccessFailureRates = (successFailureRate:any) => {
                successFailureRate.totalSuccessfulSum = formatCurrency(successFailureRate.totalSuccessfulSum, this.locale,getCurrencySymbol('USD', 'wide'));
                successFailureRate.totalFailedSum = formatCurrency(successFailureRate.totalFailedSum, this.locale,getCurrencySymbol('USD', 'wide'));
                successFailureRate.totalTransactionSum = formatCurrency(successFailureRate.totalTransactionSum, this.locale,getCurrencySymbol('USD', 'wide'));
                successFailureRate.totalSuccessfulCount = formatNumber(successFailureRate.totalSuccessfulCount, this.locale);
                successFailureRate.totalFailedCount = formatNumber(successFailureRate.totalFailedCount, this.locale);
                return successFailureRate;
              }
              this.allSuccessFailureRates = refineData(successFailureRatesResponse.data, refineSuccessFailureRates);
              this.dataSource.data = this.allSuccessFailureRates;
              this.dataLength = successFailureRatesResponse.rows;
              
      },
      (error)=>{

      })


  }

  downloadChargebackCost() {
    // this.appService.downloadChargebackCost(this.filterData).subscribe(
    //   (response) => {
    //     this.handleDownload(response);
    //   },
    //   (err: any) => {},
    //   () => {}
    // );
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  setFilterData() {
    this.filterData = {
      merchantId: 1,
      reportType: "",
      startDate: "2021-01-16",
      endDate: "2021-01-16",
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { reportType, merchantId, endDate, startDate } = payload;
    this.filterData.reportType = reportType || "";
    this.filterData.merchantId = merchantId || 0;
    this.filterData.startDate = startDate || "";
    this.filterData.endDate = endDate || "";

    this.getAllSuccessFailureRates();
  }

  onDownloadClick(reportType: string): void {
    console.log(reportType);
    this.filterData.reportType = reportType;
    this.downloadSFRReport();
  }

  /**
     * This method downloads a report
     */
    private downloadSFRReport() {
      this.filterData.pageNumber = 1;
      this.filterData.pageSize = 1000;

      this.reportService.downloadReport(this.REPORT, this.filterData).subscribe(
        (response) => {
         console.log({ response })
        },
        (err: any) => {
          console.log(err);
        },
        () => {}
      );
    }

  handleDownload(response: any): void {
    const contentDispositionHeader = response.headers.get(
      "Content-Disposition"
    );
    const parts: string[] = contentDispositionHeader.split(";");
    const fileName = parts[1].split("=")[1];
    let blob = new Blob([response._body], {
      type: response._body.type,
    });
    saveAs(blob, fileName);
  }

  ngOnDestroy() {}

}

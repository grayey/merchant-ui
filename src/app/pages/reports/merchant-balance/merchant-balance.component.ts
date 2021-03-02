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
import { refineData } from "../../../../utils/helpers";
import { formatCurrency, getCurrencySymbol, formatNumber } from '@angular/common';

@Component({
  selector: 'fury-merchant-balance',
  templateUrl: './merchant-balance.component.html',
  styleUrls: ['./merchant-balance.component.scss'],
  animations: [fadeInUpAnimation,fadeInRightAnimation ]
})
export class MerchantBalanceComponent implements OnInit, AfterViewInit, OnDestroy {
  transactions = [];
  dataLength: number = 10;

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

  filterData:any;

  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;
  allMerchantBalances:any[] = [];

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
    this.setFilterData();
    this.getAllMerchantBalances();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

     /**]
     * This methods gets a list of all merchantBalances 
     */
    public getAllMerchantBalances = async (pageEvent?: PageEvent) => {
      let pageNumber, pageSize;
      if (pageEvent) {
        pageSize = pageEvent.pageSize;
        pageNumber = pageEvent.pageIndex + 1;
      } else {
        pageSize = 10;
        pageNumber = 1;
      }
      ReportsService.MERCHANT_BALANCE_LIST_FILTER = { pageSize, pageNumber, ...this.filterData };
      
      this.reportService.getMerchantBalances().subscribe(
          (merchantBalancesResponse)=>{
              // const refineMerchantBalances = (merchantBalance:any) => {
              //   merchantBalance.totalSuccessfulSum = formatCurrency(merchantBalance.totalSuccessfulSum, this.locale,getCurrencySymbol('USD', 'wide'));
              //   merchantBalance.totalFailedSum = formatCurrency(merchantBalance.totalFailedSum, this.locale,getCurrencySymbol('USD', 'wide'));
              //   merchantBalance.totalTransactionSum = formatCurrency(merchantBalance.totalTransactionSum, this.locale,getCurrencySymbol('USD', 'wide'));
              //   merchantBalance.totalSuccessfulCount = formatNumber(merchantBalance.totalSuccessfulCount, this.locale);
              //   merchantBalance.totalFailedCount = formatNumber(merchantBalance.totalFailedCount, this.locale);
              //   return merchantBalance;
              // }
              // this.allMerchantBalances = refineData(merchantBalancesResponse.data, refineMerchantBalances);
              // this.dataSource.data = this.allMerchantBalances;
              // this.dataLength = merchantBalancesResponse.rows;
              console.log({ merchantBalancesResponse })
              
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
      merchantId:1,
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

    this.getAllMerchantBalances();
  }

  onDownloadClick(reportType: string): void {
    console.log(reportType);
    this.filterData.reportType = reportType;
    this.getAllMerchantBalances();
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

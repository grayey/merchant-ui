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
import { IMerchantBalanceFilter } from "src/interfaces/merchant-balance-filter.interface";
import { Permissions } from "src/utils/permissions";

@Component({
  selector: 'fury-merchant-balance',
  templateUrl: './merchant-balance.component.html',
  styleUrls: ['./merchant-balance.component.scss'],
  animations: [fadeInUpAnimation,fadeInRightAnimation ]
})
export class MerchantBalanceComponent extends Permissions implements OnInit, AfterViewInit, OnDestroy {
  transactions = [];
  dataLength: number = 10;
  REPORT = "MERCHANT_BALANCE";

  @Input()
  columns: ListColumn[] = [
    {
      name: "Merchant",
      property: "merchantName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Merchant No.",
      property: "merchantAccountNumber",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "No. of Transactions",
      property: "transactionCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Sum of Transactions",
      property: "transactionSum",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Processing Cost",
      property: "totalProcessingCost",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Sum to Merchant",
      property: "sumToMerchant",
      visible: true,
      isModelProperty: true,
    }
  ] as ListColumn[];

  filterData: IMerchantBalanceFilter ={
    startDate:getToday(),
    endDate:getToday(),
    pageNumber:1,
    pageSize:10
  };

  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;
  allMerchantBalances:any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private reportService: ReportsService, @Inject(LOCALE_ID) private locale: string) {
    super("Merchants' Balance")
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    // this.setFilterData();
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
      let {pageNumber, pageSize} = this.filterData;
      if (pageEvent) {
        pageSize = pageEvent.pageSize;
        pageNumber = pageEvent.pageIndex + 1;
      } 
      ReportsService.MERCHANT_BALANCE_LIST_FILTER = { pageSize, pageNumber, ...this.filterData };
      
      this.reportService.getMerchantBalances().subscribe(
          (merchantBalancesResponse)=>{
              const refineMerchantBalances = (merchantBalance:any) => {
                merchantBalance.sumToMerchant = formatCurrency(merchantBalance.sumToMerchant, this.locale,getCurrencySymbol(merchantBalance.currency, 'wide'));
                merchantBalance.totalProcessingCost = formatCurrency(merchantBalance.totalProcessingCost, this.locale,getCurrencySymbol(merchantBalance.currency, 'wide'));
                merchantBalance.transactionSum = formatCurrency(merchantBalance.transactionSum, this.locale,getCurrencySymbol(merchantBalance.currency, 'wide'));
                merchantBalance.transactionCount = formatNumber(merchantBalance.transactionCount, this.locale);
                return merchantBalance;
              }
              this.allMerchantBalances = refineData(merchantBalancesResponse.data, refineMerchantBalances);
              this.dataSource.data = this.allMerchantBalances;
              this.dataLength = merchantBalancesResponse.rows;
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
    this.downloadMerchantBalanceReport();
  }

   /**
     * This method downloads a report
     */
    private downloadMerchantBalanceReport() {
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

import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { ListColumn } from "src/@fury/shared/list/list-column.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { AppService } from "src/services/app.service";
import { IPlatformCostReport } from "../model";
import { getToday } from "src/utils/helpers"

@Component({
  selector: "fury-platform-cost",
  templateUrl: "./platform-cost.component.html",
  styleUrls: ["./platform-cost.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class PlatformCostComponent implements OnInit, AfterViewInit, OnDestroy {
  transactions = [];
  dataLenght: number = 10;
  filterData: any;

  @Input()
  columns: ListColumn[] = [
    {
      name: "Merchant",
      property: "merchant",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Merchant Account Number",
      property: "merchantAccountNumber",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Amount To Merchant",
      property: "amountToMerchant",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Amount To Bank",
      property: "amountToBank",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Amount To Platform",
      property: "amountToPlatform",
      visible: true,
      isModelProperty: true,
    },
  ] as ListColumn[];

  pageSize = 10;
  dataSource: MatTableDataSource<IPlatformCostReport> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private appService: AppService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.setFilterData();
    this.getPlatformCost();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPlatformCost(pageEvent?: PageEvent) {
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService
      .getPlatformCost(pageNumber, pageSize, this.filterData)
      .subscribe(
        (response) => {
          this.transactions = response.data;
          this.dataSource.data = this.transactions;
          this.dataLenght = response.rows;
        },
        (err: any) => {
          // this.toastrService.error(
          //   "An unknown error was encountered.Please try again",
          //   "Unknown Error"
          // );
        },
        () => {
          // this.hmoService.hideSpinner();
        }
      );
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
      merchantId: 0,
      reportType: "",
      startDate: getToday(),
      endDate: getToday(),
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { reportType, merchantId, endDate, startDate } = payload;
    this.filterData.reportType = reportType || "";
    this.filterData.merchantId = merchantId || 0;
    this.filterData.startDate = startDate || "";
    this.filterData.endDate = endDate || "";

    this.getPlatformCost();
  }

  ngOnDestroy() {}
}

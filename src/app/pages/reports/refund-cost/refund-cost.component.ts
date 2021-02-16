import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { ListColumn } from "src/@fury/shared/list/list-column.model";
import { AppService } from "src/app/services/app.service";
import { IRefundCostReport } from "../model";

@Component({
  selector: "fury-refund-cost",
  templateUrl: "./refund-cost.component.html",
  styleUrls: ["./refund-cost.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class RefundCostComponent implements OnInit, AfterViewInit, OnDestroy {
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
      name: "Total Refund Count",
      property: "totalRefundCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Refund Cost",
      property: "totalRefundCost",
      visible: true,
      isModelProperty: true,
    },
  ] as ListColumn[];

  pageSize = 10;
  dataSource: MatTableDataSource<IRefundCostReport> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private appService: AppService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.setFilterData();
    this.getRefundCost();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRefundCost(pageEvent?: PageEvent) {
    // let startDate = "2021-02-15 00:00:00";
    // let endDate = "2021-02-15 23:59:59";
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    this.appService
      .getRefundCost(pageNumber, pageSize, this.filterData)
      .subscribe(
        (response) => {
          this.transactions = response.data;
          this.dataSource.data = this.transactions;
          this.dataLenght = response.rows;
        },
        (err: any) => {},
        () => {}
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
      startDate: "",
      endDate: "",
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { reportType, merchantId, endDate, startDate } = payload;
    this.filterData.reportType = reportType || "";
    this.filterData.merchantId = merchantId || 0;
    // this.filterData.startDate = startDate || "";
    // this.filterData.endDate = endDate || "";

    this.getRefundCost();
  }

  ngOnDestroy() {}
}

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
import { AppService } from "src/services/app.service";
import { IChargebackCostReport } from "../model";
// import { saveAs } from "src/services/node_modules/file-saver/FileSaver";
import { saveAs } from "file-saver/FileSaver";
import { getToday } from "src/utils/helpers";
import { Permissions } from "src/utils/permissions";

@Component({
  selector: "fury-charge-back-cost",
  templateUrl: "./charge-back-cost.component.html",
  styleUrls: ["./charge-back-cost.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ChargeBackCostComponent extends Permissions 
  implements OnInit, AfterViewInit, OnDestroy {
  transactions = [];
  dataLenght: number = 10;

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
      name: "Total Charge Back Count",
      property: "totalChargeBackCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Charge Back Cost",
      property: "totalChargeBackCost",
      visible: true,
      isModelProperty: true,
    },
  ] as ListColumn[];

  filterData: any;
  pageSize = 10;
  dataSource: MatTableDataSource<IChargebackCostReport> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private appService: AppService,) {
    super('Charge Back Cost');
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.setFilterData();
    this.getChargebackCost();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getChargebackCost(pageEvent?: PageEvent) {
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

    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService
      .getChargebackCost(pageNumber, pageSize, this.filterData)
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

  downloadChargebackCost() {
    this.appService.downloadChargebackCost(this.filterData).subscribe(
      (response) => {
        this.handleDownload(response);
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
      merchantId: 1,
      reportType: "",
      startDate: getToday('start'),
      endDate: getToday('end'),
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { reportType, merchantId, endDate, startDate } = payload;
    this.filterData.reportType = reportType || "";
    this.filterData.merchantId = merchantId || 0;
    this.filterData.startDate = startDate || "";
    this.filterData.endDate = endDate || "";

    this.getChargebackCost();
  }

  onDownloadClick(reportType: string): void {
    console.log(reportType);
    this.filterData.reportType = reportType;
    this.getChargebackCost();
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

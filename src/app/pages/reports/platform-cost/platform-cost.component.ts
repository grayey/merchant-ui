import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IPlatformCostReport } from '../model';

@Component({
  selector: 'fury-platform-cost',
  templateUrl: './platform-cost.component.html',
  styleUrls: ['./platform-cost.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class PlatformCostComponent implements OnInit, AfterViewInit, OnDestroy {

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
    }
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
    this.getPlatformCost();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPlatformCost(pageEvent?: PageEvent) {
    let startDate = '2021-02-15 00:00:00';
    let endDate = '2021-02-15 23:59:59';
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService.getPlatformCost(startDate, endDate).subscribe(
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

  ngOnDestroy() {}

}
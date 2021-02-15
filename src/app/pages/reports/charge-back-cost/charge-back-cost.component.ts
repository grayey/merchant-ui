import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AppService } from 'src/app/services/app.service';
import { IChargebackCostReport } from '../model';

@Component({
  selector: 'fury-charge-back-cost',
  templateUrl: './charge-back-cost.component.html',
  styleUrls: ['./charge-back-cost.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ChargeBackCostComponent implements OnInit, AfterViewInit, OnDestroy {

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
    }
  ] as ListColumn[];

  pageSize = 10;
  dataSource: MatTableDataSource<IChargebackCostReport> | null;

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
    this.getChargebackCost();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getChargebackCost(pageEvent?: PageEvent) {
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
    this.appService.getChargebackCost(startDate, endDate).subscribe(
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

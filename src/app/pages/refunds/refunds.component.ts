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
  import { Observable, of, ReplaySubject } from "rxjs";
  import { filter } from "rxjs/operators";
  import { ListColumn } from "../../../@fury/shared/list/list-column.model";
  import { fadeInRightAnimation } from "../../../@fury/animations/fade-in-right.animation";
  import { fadeInUpAnimation } from "../../../@fury/animations/fade-in-up.animation";
import { RefundsService } from "../../../services/refunds/refunds.service";
import { refineData } from "../../../utils/helpers";
import { formatCurrency, getCurrencySymbol, formatDate } from '@angular/common';

@Component({
    selector: 'app-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    animations: [fadeInUpAnimation,fadeInRightAnimation ]
  })
export class RefundsComponent implements OnInit, AfterViewInit, OnDestroy {
 

    allRefunds = [];
    dataLength: number = 10;
  
    @Input()
    columns: ListColumn[] = [
      { name: "Checkbox", property: "checkbox", visible: false },
    
      {
        name: "Amount",
        property: "amount",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Gateway",
        property: "processing_gateway_name",
        visible: true,
        isModelProperty: true,
  
      },
      {
        name: "Merchant",
        property: "merchant_name",
        visible: true,
        isModelProperty: true,
  
      },
      {
        name: "Transaction Date",
        property: "transactionDate",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Refund Date",
        property: "refundDate",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Transaction Ref.",
        property: "transactionReference",
        visible: true,
        isModelProperty: true,
      },

 
      { name: "Actions", property: "actions", visible: true },
    ] as ListColumn[];
    pageSize = 10;
    filterData = {
        type: "",
        status: "",
      };
    dataSource: MatTableDataSource<any> | null;
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    constructor(private dialog: MatDialog, private refundService:RefundsService, @Inject(LOCALE_ID) private locale: string) {}
  
    get visibleColumns() {
      return this.columns
        .filter((column) => column.visible)
        .map((column) => {
          return  column.property
        });
    }
  
    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
  
    ngOnInit() {
      this.dataSource = new MatTableDataSource();
      this.getAllRefunds();
    }
  
    ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    
   
  
      /**]
     * This methods gets a list of all refunded transactions
     */
    public getAllRefunds = async (pageEvent?: PageEvent) => {
        let pageNumber, pageSize;
        if (pageEvent) {
          pageSize = pageEvent.pageSize;
          pageNumber = pageEvent.pageIndex + 1;
        } else {
          pageSize = 10;
          pageNumber = 1;
        }
        RefundsService.REFUNDS_LIST_FILTER = { pageSize, pageNumber, ...this.filterData };
        
        this.refundService.getAllRefunds().subscribe(
            (refundsResponse)=>{
                const refineRefunds = (refund:any) => {
                  refund.processing_gateway_name = refund?.processingGateway?.name;
                  refund.merchant_name = refund?.merchant?.name;
                  refund.refundDate = formatDate(refund.refundDate, 'mediumDate', this.locale);
                  refund.transactionDate = formatDate(refund.transactionDate, 'mediumDate', this.locale);
                  refund.amount = formatCurrency(refund.amount, this.locale,getCurrencySymbol(refund.currency, 'wide'));
                  return refund;
                }
                this.allRefunds = refineData(refundsResponse.data, refineRefunds);
                this.dataSource.data = this.allRefunds;
                this.dataLength = refundsResponse.rows;
                console.log({ refundsResponse })
        },
        (error)=>{

        })


    }
  
    
  
    deleteCustomer(customer) {
  
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
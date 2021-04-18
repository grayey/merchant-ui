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
import { MatDialog, } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of, ReplaySubject } from "rxjs";
import { ListColumn } from "../../../../@fury/shared/list/list-column.model";
import { ALL_IN_ONE_TABLE_DEMO_DATA } from "./all-in-one-table.demo";
import { CustomerCreateUpdateComponent } from "./customer-create-update/customer-create-update.component";
import { Customer } from "./customer-create-update/customer.model";
import { fadeInRightAnimation } from "../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import { AppService } from "src/services/app.service";
import { DatePipe, formatCurrency, getCurrencySymbol, formatNumber  } from "@angular/common";
import { ViewTransactionComponent } from "./view-transaction.component";
import { getToday } from "src/utils/helpers"
import { Permissions } from "src/utils/permissions";


@Component({
  selector: "transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class TransactionsTableComponent extends Permissions 
  implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  transactions = [];
  dataLenght: number = 10;
  filterData: any;

  @Input()
  columns: ListColumn[] = [
    // { name: "Checkbox", property: "checkbox", visible: false },
    // { name: "Image", property: "image", visible: true },
    // { name: "Name", property: "name", visible: true, isModelProperty: true },

    // {
    //   name: "Status",
    //   property: "status",
    //   visible: true,
    //   isModelProperty: true,
    // },
    {
      name: "Merchant",
      property: "merchant",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Amount",
      property: "amount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Masked PAN",
      property: "maskedPan",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Merchant Transaction Reference",
      property: "merchantTransactionReference",
      visible: true,
      isModelProperty: true,
    },
    // {
    //   name: "Merchant Request Reference",
    //   property: "merchantRequestReference",
    //   visible: true,
    //   isModelProperty: true,
    // },
    
    // {
    //   name: "Transaction Reference",
    //   property: "transactionReference",
    //   visible: true,
    //   isModelProperty: true,
    // },
    {
      name: "Transaction Date",
      property: "transactionDate",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Transaction Status",
      property: "transactionStatus",
      visible: true,
      isModelProperty: true,
    },
    // {
    //   name: "Gateway Transaction Reference",
    //   property: "gatewayTransactionReference",
    //   visible: true,
    //   isModelProperty: true,
    // },
    {
      name: "Gateway Response Message",
      property: "gatewayResponseMessage",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Settlement Status",
      property: "settlementStatus",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Settlement Date",
      property: "settlementDate",
      visible: false,
      isModelProperty: true,
    },

    // { name: "City", property: "city", visible: true, isModelProperty: true },
    // {
    //   name: "Phone",
    //   property: "phoneNumber",
    //   visible: true,
    //   isModelProperty: true,
    // },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  pageSize = 10;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super("Transactions");
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(
      ALL_IN_ONE_TABLE_DEMO_DATA.map((customer) => new Customer(customer))
    );
  }

  ngOnInit() {
    this.getData().subscribe((customers) => {
      this.subject$.next(customers);
    });
    this.setFilterData();

    this.dataSource = new MatTableDataSource();

    // this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
    //   this.customers = customers;
    //   this.dataSource.data = customers;
    // });
    this.getTransactions();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setFilterData() {
    this.filterData = {
      gatewayTransactionReference: "",
      transactionDate: getToday(),
      transactionStatus: "",
      amount: 0,
      merchantTransactionReference: "",
      startDate: getToday(), //getToday()
      endDate: getToday()//getToday(),
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const {
      gatewayTransactionReference,
      transactionDate,
      transactionStatus,
      amount,
      merchantTransactionReference,
      startDate,
      endDate,
    } = payload;
    this.filterData.gatewayTransactionReference =
      gatewayTransactionReference || "";
    this.filterData.transactionDate = transactionDate || "";
    this.filterData.transactionStatus = transactionStatus || "";
    this.filterData.amount = amount || 0;
    this.filterData.merchantTransactionReference =
      merchantTransactionReference || "";
    this.filterData.startDate =
      this.datePipe.transform(startDate, "yyyy-MM-dd") || "";
    this.filterData.endDate =
      this.datePipe.transform(endDate, "yyyy-MM-dd") || "";
    this.getTransactions();
  }

  getTransactions(pageEvent?: PageEvent) {
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    console.log(this.filterData);
    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService
      .getTransactions(pageNumber, pageSize, this.filterData)
      .subscribe(
        (response) => {
          response.data.forEach((row) =>{
            const { currency, amount } = row;
            row.amount = formatCurrency(amount, this.locale,getCurrencySymbol(currency, 'wide'))
          })
          this.transactions = response.data;
          this.dataSource.data = this.transactions;
          this.dataLenght = response.rows;
        },
        (err) => {
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

  viewTransaction = (data) => {
    this.dialog.open(ViewTransactionComponent, { 
      data,
      panelClass:'dialog-lg'
     }).afterOpened().subscribe(
      (transResponse) =>{

        console.log({ transResponse })

      },
      (error) =>{
        console.log({ error })
      })
  }

  onDownloadClick(reportType: string): void {
    this.filterData.reportType = reportType;
    this.downloadTransactionReport();
  }

  downloadTransactionReport() {
    this.appService.downloadTransactions(1, 1000, this.filterData).subscribe(
      (response) => {
        this.appService.handleDownload(response);
      },
      (err: any) => {
        console.log(err);
      },
      () => {}
    );
  }

  ngOnDestroy() {}
}



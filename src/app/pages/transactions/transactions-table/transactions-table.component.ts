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
import { Observable, of, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";
import { ListColumn } from "../../../../@fury/shared/list/list-column.model";
import { ALL_IN_ONE_TABLE_DEMO_DATA } from "./all-in-one-table.demo";
import { CustomerCreateUpdateComponent } from "./customer-create-update/customer-create-update.component";
import { Customer } from "./customer-create-update/customer.model";
import { fadeInRightAnimation } from "../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import { AppService } from "src/app/services/app.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class TransactionsTableComponent
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
    // {
    //   name: "Merchant Request Reference",
    //   property: "merchantRequestReference",
    //   visible: true,
    //   isModelProperty: true,
    // },
    {
      name: "Merchant Transaction Reference",
      property: "merchantTransactionReference",
      visible: true,
      isModelProperty: true,
    },
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
      name: "Currency",
      property: "currency",
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
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Transaction Status",
      property: "transactionStatus",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Settlement Status",
      property: "settlementStatus",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Settlement Date",
      property: "settlementDate",
      visible: true,
      isModelProperty: true,
    },

    // { name: "City", property: "city", visible: true, isModelProperty: true },
    // {
    //   name: "Phone",
    //   property: "phoneNumber",
    //   visible: true,
    //   isModelProperty: true,
    // },
    // { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  pageSize = 10;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private appService: AppService, private datePipe: DatePipe) {}

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
      transactionDate: "",
      transactionStatus: "",
      amount: 0,
      merchantTransactionReference: "",
      startDate: "",
      endDate: ""
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
      endDate
    } = payload;
    this.filterData.gatewayTransactionReference =
      gatewayTransactionReference || "";
    this.filterData.transactionDate = transactionDate || "";
    this.filterData.transactionStatus = transactionStatus || "";
    this.filterData.amount = amount || 0;
    this.filterData.merchantTransactionReference =
      merchantTransactionReference || "";
      this.filterData.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd') || "";
      this.filterData.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd') || "";
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

  createCustomer() {
    this.dialog
      .open(CustomerCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: Customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.customers.unshift(new Customer(customer));
          this.subject$.next(this.customers);
        }
      });
  }

  updateCustomer(customer) {
    this.dialog
      .open(CustomerCreateUpdateComponent, {
        data: customer,
      })
      .afterClosed()
      .subscribe((customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.customers.findIndex(
            (existingCustomer) => existingCustomer.id === customer.id
          );
          this.customers[index] = new Customer(customer);
          this.subject$.next(this.customers);
        }
      });
  }

  deleteCustomer(customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(
      this.customers.findIndex(
        (existingCustomer) => existingCustomer.id === customer.id
      ),
      1
    );
    this.subject$.next(this.customers);
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

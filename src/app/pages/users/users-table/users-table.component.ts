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
import { AppService } from "src/services/app.service";

@Component({
  selector: "fury-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  users = [];
  dataLenght: number = 10;

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    // { name: "Name", property: "name", visible: true, isModelProperty: true },
    {
      name: "Username",
      property: "username",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Full Name",
      property: "fullName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Status",
      property: "activeStatus",
      visible: true,
      isModelProperty: true,
    },
    // {
    //   name: "Zipcode",
    //   property: "zipcode",
    //   visible: true,
    //   isModelProperty: true,
    // },
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
  filterData: any;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private appService: AppService) {}

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
    this.dataSource = new MatTableDataSource();
    this.getData().subscribe((customers) => {
      this.subject$.next(customers);
    });
    this.setFilterData();

    // this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
    //   this.customers = customers;
    //   this.dataSource.data = customers;
    // });
    this.getUsers();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setFilterData() {
    this.filterData = {
      fullName: "",
      username: "",
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { fullName, username } = payload;
    this.filterData.fullName = fullName || "";
    this.filterData.username = username || "";
    this.getUsers();
  }

  getUsers(pageEvent?: PageEvent) {
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService.getUsers(pageNumber, pageSize, this.filterData).subscribe(
      (response) => {
        this.users = response.data;
        this.dataSource.data = this.users;
        this.dataLenght = response.rows;
      },
      (err) => {},
      () => {}
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
        this.getUsers();
        // if (customer) {
        //   /**
        //    * Here we are updating our local array.
        //    * You would probably make an HTTP request here.
        //    */
        //   this.customers.unshift(new Customer(customer));
        //   this.subject$.next(this.customers);
        // }
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
        this.getUsers();
        // if (customer) {
        //   /**
        //    * Here we are updating our local array.
        //    * You would probably make an HTTP request here.
        //    */
        //   const index = this.customers.findIndex(
        //     (existingCustomer) => existingCustomer.id === customer.id
        //   );
        //   this.customers[index] = new Customer(customer);
        //   this.subject$.next(this.customers);
        // }
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

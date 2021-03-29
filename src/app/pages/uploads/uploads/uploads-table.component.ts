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
import { UploadsCreateUpdateComponent } from "./uploads-create-update/uploads-create-update.component";
import { Customer } from "./uploads-create-update/customer.model";
import { fadeInRightAnimation } from "../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import { AppService } from "src/services/app.service";
import { UploadsDetailComponent } from '../uploads-detail.component';

@Component({
  selector: "fury-uploads-table",
  templateUrl: "./uploads-table.component.html",
  styleUrls: ["./uploads-table.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class UploadsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  uploads = [];
  dataLenght: number = 10;

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    // { name: "Name", property: "name", visible: true, isModelProperty: true },
    {
      name: "Name",
      property: "originalFileName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Type",
      property: "type",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Records",
      property: "totalNumberOfRecord",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Processed",
      property: "noOfRecordsProcessed",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Reference",
      property: "requestUniqueReference",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Upload Date",
      property: "dateOfUpload",
      visible: true,
      isModelProperty: true,
    },

    {
      name: "Status",
      property: "status",
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
  showFilter: boolean;
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
  getData() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.setFilterData();

    // this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
    //   this.customers = customers;
    //   this.dataSource.data = customers;
    // });
    this.getUploads();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setFilterData() {
    this.filterData = {
      type: "",
      status: "",
    };
  }

  onFilterClick(payload: any): void {
    console.log(payload);
    const { type, status } = payload;
    this.filterData.type = type || "";
    this.filterData.status = status || "";
    this.getUploads();
  }

  getUploads(pageEvent?: PageEvent) {
    let pageNumber, pageSize;
    if (pageEvent) {
      pageSize = pageEvent.pageSize;
      pageNumber = pageEvent.pageIndex + 1;
    } else {
      pageSize = 10;
      pageNumber = 1;
    }

    // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
    this.appService.getUploads(pageNumber, pageSize, this.filterData).subscribe(
      (response) => {
        this.uploads = response.data;
        this.dataSource.data = this.uploads;
        this.dataLenght = response.rows;
      },
      (err) => {},
      () => {}
    );
  }

  createCustomer() {
    this.dialog
      .open(UploadsCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: Customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        this.getUploads();
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
      .open(UploadsCreateUpdateComponent, {
        data: customer,
      })
      .afterClosed()
      .subscribe((customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        this.getUploads();
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

  public viewContent = (data) => {
    this.dialog.open(UploadsDetailComponent, { 
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

  ngOnDestroy() {}
}

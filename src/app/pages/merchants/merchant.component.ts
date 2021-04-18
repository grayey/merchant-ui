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
import { ListColumn } from "src/@fury/shared/list/list-column.model";

import { MerchantCreateComponent } from "./merchant-create.component";
import { MerchantUpdateComponent } from "./merchant-update.component";
import { IMerchant } from "src/interfaces/merchant.interface";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { AppService } from "src/services/app.service";

@Component({
  selector: 'fury-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  //  subject$: ReplaySubject<IMerchant[]> = new ReplaySubject<IMerchant[]>(1);
  //  data$: Observable<IMerchant[]> = this.subject$.asObservable();
   merchants: IMerchant[];
   dataLength: number = 10;
 
   @Input()
   columns: ListColumn[] = [
     { name: "Checkbox", property: "checkbox", visible: false },
     // { name: "Name", property: "name", visible: true, isModelProperty: true },
     {
       name: "Merchant",
       property: "merchantName",
       visible: true,
       isModelProperty: true,
     },
     {
      name: "Email",
      property: "email",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Mobile",
      property: "mobile",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Bank",
      property: "bankName",
      visible: true,
      isModelProperty: true,
    },
     {
       name: "Account No.",
       property: "accountNumber",
       visible: true,
       isModelProperty: true,
     },
     {
       name: "Category",
       property: "businessCategoryName",
       visible: true,
       isModelProperty: true,
     },
     {
      name: "Gateway",
      property: "processingGatewayName",
      visible: true,
      isModelProperty: true,
    },
     {
       name: "Country",
       property: "countryName",
       visible: false,
       isModelProperty: true,
     },
     { name: "City", property: "city", visible: false, isModelProperty: true },
     { name: "Date Created", property: "dateCreated", visible: false, isModelProperty: true },
   
     { name: "Actions", property: "actions", visible: true },
   ] as ListColumn[];
   pageSize = 10;
   filterData: any;
   dataSource: MatTableDataSource<IMerchant> | null;
 
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
   getData():any {
    //  return of(
    //    ALL_IN_ONE_TABLE_DEMO_DATA.map((merchant) => new Merchant(merchant))
    //  );
   }
 
   ngOnInit() {
     this.dataSource = new MatTableDataSource();
  
     this.setFilterData();
     this.getMerchants();

// accountNumber: "1234567890"
// bankName: "Access Bank Plc"
// businessCategoryName: "General Merchant"
// city: "NY"
// code: "b45df525-d976-44f3-ab19-bd09feb0643a"
// countryName: "US"
// dateCreated: "2021-01-15T17:48:00.000+0000"
// developerEmail: null
// developerMobile: null
// email: "oo@codeiq.ng"
// merchantId: 1
// merchantName: "UK Merchant"
// mobile: "2348026966835"
// processingGatewayName: "Access Bank CyberSource Gateway"
   }
 
   ngAfterViewInit() {
     // this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   setFilterData() {
     this.filterData = {
       fullName: "",
       merchantname: "",
     };
   }
 
   onFilterClick(payload: any): void {
     console.log(payload);
     const { fullName, merchantname } = payload;
     this.filterData.fullName = fullName || "";
     this.filterData.merchantname = merchantname || "";
     this.getMerchants();
   }
 
   getMerchants(pageEvent?: PageEvent) {
     let pageNumber, pageSize;
     if (pageEvent) {
       pageSize = pageEvent.pageSize;
       pageNumber = pageEvent.pageIndex + 1;
     } else {
       pageSize = 10;
       pageNumber = 1;
     }
 
     // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
     this.appService.getMerchants().subscribe(
       (response) => {
         this.merchants = response.data;
         this.dataSource.data = this.merchants;
         this.dataLength = response.rows;
         console.log({"MEMMEME": this.merchants})
       },
       (err) => {},
       () => {}
     );
   }
 
   createMerchant() {
     this.dialog
       .open(MerchantCreateComponent)
       .afterClosed()
       .subscribe((merchant: IMerchant) => {
         /**
          * Merchant is the updated merchant (if the merchant pressed Save - otherwise it's null)
          */
         this.getMerchants();
         // if (merchant) {
         //   /**
         //    * Here we are updating our local array.
         //    * You would probably make an HTTP request here.
         //    */
         //   this.merchants.unshift(new Merchant(merchant));
         //   this.subject$.next(this.merchants);
         // }
       });
   }
 
   updateMerchant(merchant) {
     this.dialog
       .open(MerchantUpdateComponent, {
         data: merchant,
       })
       .afterClosed()
       .subscribe((merchant) => {
         /**
          * Merchant is the updated merchant (if the merchant pressed Save - otherwise it's null)
          */
         this.getMerchants();
         // if (merchant) {
         //   /**
         //    * Here we are updating our local array.
         //    * You would probably make an HTTP request here.
         //    */
         //   const index = this.merchants.findIndex(
         //     (existingMerchant) => existingMerchant.id === merchant.id
         //   );
         //   this.merchants[index] = new Merchant(merchant);
         //   this.subject$.next(this.merchants);
         // }
       });
   }
 
   deleteMerchant(merchant) {
     /**
      * Here we are updating our local array.
      * You would probably make an HTTP request here.
      */
     this.merchants.splice(
       this.merchants.findIndex(
         (existingMerchant:any) => existingMerchant.id === merchant.id
       ),
       1
     );
    //  this.subject$.next(this.merchants);
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

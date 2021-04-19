import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";
import { ListColumn } from "src/@fury/shared/list/list-column.model";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { AppService } from "src/services/app.service";
import { IRole } from "src/interfaces/role.interface";
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleUpdateComponent } from './role-update/role-update.component';

import { Permissions } from "src/utils/permissions";


@Component({
  selector: 'fury-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends Permissions implements OnInit {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  //  subject$: ReplaySubject<IRole[]> = new ReplaySubject<IRole[]>(1);
  //  data$: Observable<IRole[]> = this.subject$.asObservable();
   roles: IRole[];
   dataLength: number = 10;
 
   @Input()
   columns: ListColumn[] = [
     { name: "Checkbox", property: "checkbox", visible: false },
     // { name: "Name", property: "name", visible: true, isModelProperty: true },
     {
       name: "Role",
       property: "name",
       visible: true,
       isModelProperty: true,
     },
     {
      name: "Code",
      property: "code",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Description",
      property: "mobile",
      visible: true,
      isModelProperty: true,
    },
   
     { name: "Date Created", property: "dateCreated", visible: false, isModelProperty: true },
   
     { name: "Actions", property: "actions", visible: true },
   ] as ListColumn[];
   pageSize = 10;
   filterData: any;
   dataSource: MatTableDataSource<IRole> | null;

 
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
 
   constructor(private dialog: MatDialog, private appService: AppService, private router:Router) {
     super('Roles');
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
   getData():any {
    //  return of(
    //    ALL_IN_ONE_TABLE_DEMO_DATA.map((role) => new Role(role))
    //  );
   }
 
   ngOnInit() {
     this.dataSource = new MatTableDataSource();
  
     this.setFilterData();
     this.getRoles();

// accountNumber: "1234567890"
// bankName: "Access Bank Plc"
// businessCategoryName: "General Role"
// city: "NY"
// code: "b45df525-d976-44f3-ab19-bd09feb0643a"
// countryName: "US"
// dateCreated: "2021-01-15T17:48:00.000+0000"
// developerEmail: null
// developerMobile: null
// email: "oo@codeiq.ng"
// roleId: 1
// roleName: "UK Role"
// mobile: "2348026966835"
// processingGatewayName: "Access Bank CyberSource Gateway"
   }
 
   ngAfterViewInit() {
     // this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   setFilterData() {
    this.filterData = {
      name: "",
      // merchantId:1
    };
   }
 
   onFilterClick(payload: any): void {
     const { fullName, name } = payload;
     this.filterData.name = name || "";
     this.getRoles();
   }
 
   getRoles(pageEvent?: PageEvent) {
     let pageNumber, pageSize;
     if (pageEvent) {
       pageSize = pageEvent.pageSize;
       pageNumber = pageEvent.pageIndex + 1;
     } else {
       pageSize = 10;
       pageNumber = 1;
     }
 
     // const { gender, activeStatus, corporateId, providerId } = this.filterValues;
     this.appService.getRoles(pageNumber, pageSize, this.filterData).subscribe(
       (response) => {
         this.roles = response.data;
         this.dataSource.data = this.roles;
         this.dataLength = response.rows;
         console.log({"MEMMEME": this.roles})
       },
       (err) => {},
       () => {}
     );
   }
 
   createRole() {
     this.dialog
       .open(RoleCreateComponent)
       .afterClosed()
       .subscribe((role: IRole) => {
         /**
          * Role is the updated role (if the role pressed Save - otherwise it's null)
          */
         this.getRoles();
         // if (role) {
         //   /**
         //    * Here we are updating our local array.
         //    * You would probably make an HTTP request here.
         //    */
         //   this.roles.unshift(new Role(role));
         //   this.subject$.next(this.roles);
         // }
       });
   }
 
   updateRole(role) {
     if(!this.CAN_EDIT) return;
     
     this.dialog
       .open(RoleUpdateComponent, {
         data: role,
       })
       .afterClosed()
       .subscribe((role) => {
         /**
          * Role is the updated role (if the role pressed Save - otherwise it's null)
          */
         this.getRoles();
         // if (role) {
         //   /**
         //    * Here we are updating our local array.
         //    * You would probably make an HTTP request here.
         //    */
         //   const index = this.roles.findIndex(
         //     (existingRole) => existingRole.id === role.id
         //   );
         //   this.roles[index] = new Role(role);
         //   this.subject$.next(this.roles);
         // }
       });
   }
 
   deleteRole(role) {
     /**
      * Here we are updating our local array.
      * You would probably make an HTTP request here.
      */
     this.roles.splice(
       this.roles.findIndex(
         (existingRole:any) => existingRole.id === role.id
       ),
       1
     );
    //  this.subject$.next(this.roles);
   }
 
   onFilterChange(value) {
     if (!this.dataSource) {
       return;
     }
     value = value.trim();
     value = value.toLowerCase();
     this.dataSource.filter = value;
   }

   /**
    * This method navigates to the role detail component
    */
   viewRole = (role) =>{
     this.router.navigateByUrl(`roles/${role.id}`)

   }
 
   ngOnDestroy() {}

}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "../../../../@fury/shared/list/list.module";
import { MaterialModule } from "../../../../@fury/shared/material-components.module";
import { UsersTableRoutingModule } from "./users-table-routing.module";
import { UsersTableComponent } from "./users-table.component";
import { CustomerCreateUpdateModule } from "./customer-create-update/customer-create-update.module";
import { FurySharedModule } from "../../../../@fury/fury-shared.module";

@NgModule({
  imports: [
    CommonModule,
    UsersTableRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
  ],
  declarations: [UsersTableComponent],
  exports: [UsersTableComponent],
})
export class UsersTableModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "../../../../@fury/shared/list/list.module";
import { MaterialModule } from "../../../../@fury/shared/material-components.module";
import { SettlementsTableRoutingModule } from "./settlements-table-routing.module";
import { SettlementsTableComponent } from "./settlements-table.component";
import { CustomerCreateUpdateModule } from "./customer-create-update/customer-create-update.module";
import { FurySharedModule } from "../../../../@fury/fury-shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
    SettlementsTableRoutingModule,
  ],
  declarations: [SettlementsTableComponent],
  exports: [SettlementsTableComponent],
})
export class SettlementsTableModule {}

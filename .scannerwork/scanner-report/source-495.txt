import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "../../../../@fury/shared/list/list.module";
import { MaterialModule } from "../../../../@fury/shared/material-components.module";
import { UploadsTableRoutingModule } from "./uploads-table-routing.module";
import { FurySharedModule } from "../../../../@fury/fury-shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { UploadsTableComponent } from "./uploads-table.component";
import { UploadsCreateUpdateModule } from "./uploads-create-update/uploads-create-update.module";

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
    UploadsCreateUpdateModule,
    BreadcrumbsModule,
    UploadsTableRoutingModule,
  ],
  declarations: [UploadsTableComponent],
  exports: [UploadsTableComponent],
})
export class UploadsTableModule {}

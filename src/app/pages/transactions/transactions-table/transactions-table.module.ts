import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "../../../../@fury/shared/list/list.module";
import { MaterialModule } from "../../../../@fury/shared/material-components.module";
import { TransactionsTableRoutingModule } from "./transactions-table-routing.module";
import { CustomerCreateUpdateModule } from "./customer-create-update/customer-create-update.module";
import { FurySharedModule } from "../../../../@fury/fury-shared.module";
import { TransactionsTableComponent } from "./transactions-table.component";
import { ViewTransactionComponent } from "./view-transaction.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    TransactionsTableRoutingModule,
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
  ],
  declarations: [TransactionsTableComponent, ViewTransactionComponent],
  exports: [TransactionsTableComponent, ViewTransactionComponent],
  providers: [DatePipe]
})
export class TransactionsTableModule {}

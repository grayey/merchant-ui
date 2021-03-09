import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './merchant.component';
import { MerchantUpdateComponent } from './merchant-update.component';
import { MerchantCreateComponent } from './merchant-create.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "src/@fury/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "src/@fury/shared/list/list.module";
import { MaterialModule } from "src/@fury/shared/material-components.module";
import { FurySharedModule } from "src/@fury/fury-shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MERCHANTS_ROUTES } from './merchants.routing';




@NgModule({
  declarations: [MerchantComponent, MerchantUpdateComponent, MerchantCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FurySharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
     // Core
     ListModule,
     BreadcrumbsModule,
    RouterModule.forChild(MERCHANTS_ROUTES)

  ]
})
export class MerchantsModule { }

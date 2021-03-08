import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { PlatformCostComponent } from './platform-cost/platform-cost.component';
import { RefundCostComponent } from './refund-cost/refund-cost.component';
import { ChargeBackCostComponent } from './charge-back-cost/charge-back-cost.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { SuccessFailureRateComponent } from './success-failure-rate/success-failure-rate.component';
import { MerchantBalanceComponent } from './merchant-balance/merchant-balance.component';


@NgModule({
  declarations: [PlatformCostComponent, RefundCostComponent, ChargeBackCostComponent, SuccessFailureRateComponent, MerchantBalanceComponent],
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
    BreadcrumbsModule,
    ReportsRoutingModule
  ],
  exports: [PlatformCostComponent, RefundCostComponent, ChargeBackCostComponent]
})
export class ReportsModule { }

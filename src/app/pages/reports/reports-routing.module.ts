import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeBackCostComponent } from './charge-back-cost/charge-back-cost.component';
import { PlatformCostComponent } from './platform-cost/platform-cost.component';
import { RefundCostComponent } from './refund-cost/refund-cost.component';

const routes: Routes = [
  {
    path: "platform-cost",
    component: PlatformCostComponent,
  },
  {
    path: "refund-cost",
    component: RefundCostComponent,
  },
  {
    path: "charge-back-cost",
    component: ChargeBackCostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

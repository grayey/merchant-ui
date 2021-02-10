import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChargeBacksTableComponent } from "./charge-backs-table.component";

const routes: Routes = [
  {
    path: "",
    component: ChargeBacksTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeBacksTableRoutingModule {}

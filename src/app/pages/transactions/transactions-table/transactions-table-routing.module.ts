import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionsTableComponent } from "./transactions-table.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsTableRoutingModule {}

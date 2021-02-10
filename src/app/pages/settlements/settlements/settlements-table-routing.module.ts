import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettlementsTableComponent } from "./settlements-table.component";

const routes: Routes = [
  {
    path: "",
    component: SettlementsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementsTableRoutingModule {}

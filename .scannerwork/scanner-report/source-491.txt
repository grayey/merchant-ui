import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadsTableComponent } from "./uploads-table.component";

const routes: Routes = [
  {
    path: "",
    component: UploadsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadsTableRoutingModule {}

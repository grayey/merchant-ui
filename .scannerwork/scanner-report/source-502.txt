import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersTableComponent } from "./users-table.component";

const routes: Routes = [
  {
    path: "",
    component: UsersTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersTableRoutingModule {}

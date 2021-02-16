import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialModule } from "../material-components.module";
import { FilterDropdownComponent } from "./filter-dropdown.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [FilterDropdownComponent],
  exports: [FilterDropdownComponent],
})
export class FilterDropdownModule {}

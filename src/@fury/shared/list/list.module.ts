import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DownloadDropdownModule } from "../download-dropdown/download-dropdown.module";

import { FilterDropdownModule } from "../filter-dropdown/filter-dropdown.module";
import { MaterialModule } from "../material-components.module";
import { ListComponent } from "./list.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FilterDropdownModule,
    DownloadDropdownModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}

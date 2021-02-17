import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadDropdownComponent } from './download-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material-components.module';


@NgModule({
  declarations: [DownloadDropdownComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [DownloadDropdownComponent]
})
export class DownloadDropdownModule { }

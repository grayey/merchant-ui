import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { ListModule } from "../../../@fury/shared/list/list.module";
import { MaterialModule } from "../../../@fury/shared/material-components.module";
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { RefundsComponent } from './refunds.component';
import { REFUNDS_ROUTES } from './refunds.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FurySharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,

    // Core
    ListModule,
    RouterModule.forChild(REFUNDS_ROUTES)
  ],
  declarations: [RefundsComponent],
})

export class RefundsModule {
}

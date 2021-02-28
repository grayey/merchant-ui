import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { RouterModule } from "@angular/router";
import { RefundsComponent } from './refunds.component';
import { REFUNDS_ROUTES } from './refunds.routing';

@NgModule({
  imports: [
    CommonModule,
    FurySharedModule,
    FuryCardModule,
    RouterModule.forChild(REFUNDS_ROUTES)
  ],
  declarations: [RefundsComponent]
})
export class ComingSoonModule {
}

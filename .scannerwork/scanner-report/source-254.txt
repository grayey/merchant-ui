import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonRoutingModule } from './coming-soon-routing.module';
import { ComingSoonComponent } from './coming-soon.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    ComingSoonRoutingModule,
    FurySharedModule,
    FuryCardModule
  ],
  declarations: [ComingSoonComponent]
})
export class ComingSoonModule {
}

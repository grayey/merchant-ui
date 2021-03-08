import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { HighlightModule } from '../../../../@fury/shared/highlightjs/highlight.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FormElementsRoutingModule } from './form-elements-routing.module';
import { FormElementsComponent } from './form-elements.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormElementsRoutingModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,

    // Core
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule
  ],
  declarations: [FormElementsComponent]
})
export class FormElementsModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FormWizardRoutingModule } from './form-wizard-routing.module';
import { FormWizardComponent } from './form-wizard.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormWizardRoutingModule,
    FurySharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [FormWizardComponent]
})
export class FormWizardModule {
}

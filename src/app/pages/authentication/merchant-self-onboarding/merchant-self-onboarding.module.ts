import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { MerchantSelfOnboardingComponent } from './merchant-self-onboarding.component';
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { FurySharedModule } from "src/@fury/fury-shared.module";
import { RouterModule, Routes } from '@angular/router';

const SELF_ONBOARDING_ROUTES:Routes = [
    {
        path:"",
        component:MerchantSelfOnboardingComponent
    }
]


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    FurySharedModule,
    RouterModule.forChild(SELF_ONBOARDING_ROUTES)

  ],
  declarations: [MerchantSelfOnboardingComponent]
})
export class MerchantSelfOnboardingModule {
}

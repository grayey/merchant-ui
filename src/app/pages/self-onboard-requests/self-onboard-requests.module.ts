import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfOnboardRequestsComponent } from './self-onboard-requests.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';

const SELF_ONBOARD_ROUTES:Routes = [
    {
      path:"",
      component:SelfOnboardRequestsComponent
    }
]


@NgModule({
  declarations: [SelfOnboardRequestsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FurySharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
     // Core
     ListModule,
     BreadcrumbsModule,
    RouterModule.forChild(SELF_ONBOARD_ROUTES)
  ]
})
export class SelfOnboardRequestsModule { }

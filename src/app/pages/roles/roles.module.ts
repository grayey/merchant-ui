import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ROLES_ROUTES } from "./roles.routing";
import { RouterModule } from '@angular/router';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [ RolesComponent, RoleDetailComponent, RoleCreateComponent, RoleUpdateComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FurySharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
     // Core
     ListModule,
     BreadcrumbsModule,
    RouterModule.forChild(ROLES_ROUTES)
  ]
})
export class RolesModule { }

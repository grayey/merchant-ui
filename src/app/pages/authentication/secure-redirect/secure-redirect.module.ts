import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureRedirectComponent } from './secure-redirect.component';
import { RouterModule, Routes } from '@angular/router';

const SECURE_REDIRECT_ROUTE:Routes = [
  {
    component:SecureRedirectComponent,
    path:''
  }
]


@NgModule({
  declarations: [SecureRedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SECURE_REDIRECT_ROUTE)
  ]
})
export class SecureRedirectModule { }

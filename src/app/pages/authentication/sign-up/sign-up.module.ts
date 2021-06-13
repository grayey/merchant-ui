import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SignUpComponent } from "./sign-up.component";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignUpComponent],
  exports:[SignUpComponent]
})

export class SignUpModule{

}


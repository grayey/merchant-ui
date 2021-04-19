import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AppService } from "src/services/app.service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { processErrors } from "src/utils/helpers";

@Component({
  selector: 'fury-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  public createRoleForm:FormGroup;
  public loaders = {
    processing:false
  }

  private static createRoleForm = () => {

    return {
      name:['',Validators.required],
      roleFunctionsJson:['',Validators.required],
      code:['',Validators.required],
    }
  }

  constructor(private fb:FormBuilder, private appService:AppService, private toaster:ToastrService, private dialogRef: MatDialogRef<RoleCreateComponent>,) {
    this.createRoleForm = fb.group(RoleCreateComponent.createRoleForm())
   }

  ngOnInit(): void {
  }

  public createRole = () =>{
    const data = this.createRoleForm.value;
    this.loaders.processing = true;

    this.appService.createRole(data).subscribe(
      (response) => {
        this.toggleModal();
      this.loaders.processing = false;
        this.toaster.success(`${data.name} successfully created!`);

      },
      (err) => {
        this.toaster.error(processErrors(err))
        this.loaders.processing = false;

      },
      () => {}
    );
  }

  public toggleModal = (action='close') =>{
    if(['close', 'open'].includes(action)) this.dialogRef[action]();
  }
}


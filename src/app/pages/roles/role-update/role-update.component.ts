import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AppService } from "src/services/app.service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { processErrors } from "src/utils/helpers";

@Component({
  selector: 'fury-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {

  public updateRoleForm:FormGroup;

  public loaders = {
    processing:false
  }

  private static updateRoleForm = () => {

    return {
      name:['',Validators.required],
      roleFunctionsJson:['',Validators.required],
      code:['',Validators.required],
    }
  }

  constructor(private fb:FormBuilder, private appService:AppService, private toaster:ToastrService,  @Inject(MAT_DIALOG_DATA) public editedRole: any,  private dialogRef: MatDialogRef<RoleUpdateComponent>,) {
    this.updateRoleForm = fb.group(RoleUpdateComponent.updateRoleForm())
   }

  ngOnInit(): void {
    this.updateRoleForm.patchValue({ ...this.editedRole });
  }

  public updateRole = () =>{
    this.loaders.processing = true;
    
    this.appService.updateRole(this.updateRoleForm.value, this.editedRole.id).subscribe(
      (response) => {
    this.loaders.processing = false;

        this.toggleModal();
        this.toaster.success(`${this.editedRole.name} successfully updated!`);
      },
      (err) => {
    this.loaders.processing = false;
        this.toaster.error(processErrors(err))
      },
      () => {}
    );
  }

  public toggleModal = (action='close') =>{
    if(['close', 'open'].includes(action)) this.dialogRef[action]();
  }
}


import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppService } from "src/app/services/app.service";
import { Customer } from "./customer.model";

@Component({
  selector: "fury-uploads-create-update",
  templateUrl: "./uploads-create-update.component.html",
  styleUrls: ["./uploads-create-update.component.scss"],
})
export class UploadsCreateUpdateComponent implements OnInit {
  static id = 100;
  uploadTypes = [
    {
      id: 2,
      name: "settlement",
    },
    {
      id: 3,
      name: "charge-back",
    },
  ];
  percentDone: number;
  uploadSuccess: boolean;

  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UploadsCreateUpdateComponent>,
    private fb: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Customer;
    }

    this.form = this.fb.group({
      // fullName: [this.defaults.fullName || ""],
      uploadType: [""],
    });
  }

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
    var formData = new FormData();
    // formData.append()
    Array.from(files).forEach((f) => formData.append("fileName", f));

    this.appService.uploadItem(formData).subscribe((event) => {
      this.dialogRef.close();
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round((100 * event.loaded) / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
    });
  }

  private upsertUser(user) {
    console.log("Create User");
    this.appService.createUser(user).subscribe(
      (response) => {
        this.dialogRef.close();
        // this.userStatuses = response.data;
      },
      (err) => {},
      () => {}
    );
  }

  save() {
    if (this.mode === "create") {
      this.createCustomer();
    } else if (this.mode === "update") {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const user = this.form.value;
    this.upsertUser(user);
    console.log(user);
    // this.dialogRef.close(user);
  }

  updateCustomer() {
    const user = this.form.value;
    if (this.form.valid) {
      console.log(this.defaults);
      user["id"] = this.defaults.id;
      this.upsertUser(user);
    }
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}

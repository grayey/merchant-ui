import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppService } from "src/services/app.service";
import { Customer } from "./customer.model";

@Component({
  selector: "fury-customer-create-update",
  templateUrl: "./customer-create-update.component.html",
  styleUrls: ["./customer-create-update.component.scss"],
})
export class CustomerCreateUpdateComponent implements OnInit {
  static id = 100;
  userRoles = [];
  userStatuses = [];
  userTypes = [];

  typesx: [
    {
      name: "SETTLEMENT";
    },
    {
      name: "CHARGE_BACKS";
    }
  ];

  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Customer;
    }

    console.log(this.mode);

    // username: [
    //   this.defaults.username || "",
    //   Validators.compose([Validators.required]),
    // ],
    // password: [
    //   this.defaults.password || "",
    //   Validators.compose([Validators.required]),
    // ],
    // fullName: [
    //   this.defaults.fullName || "",
    //   Validators.compose([Validators.required]),
    // ],
    // activeStatus: [
    //   this.defaults.activeStatus || "",
    //   Validators.compose([Validators.required]),
    // ],
    // userRoleId: [
    //   this.defaults.userRoleId || "",
    //   Validators.compose([Validators.required]),
    // ],
    // userTypeId: [
    //   this.defaults.userTypeId || "",
    //   ,
    //   Validators.compose([Validators.required]),
    // ],

    this.form = this.fb.group({
      username: [this.defaults.username || ""],
      password: [""],
      fullName: [this.defaults.fullName || ""],
      activeStatus: [this.defaults.activeStatus || ""],
      userRoleId: [this.defaults.userRole ? this.defaults.userRole.id : ""],
      userTypeId: [this.defaults.userType ? this.defaults.userType.id : ""],
    });
    this.getUserRoles();
    this.getUserTypes();
    this.getUserStatuses();
  }

  private getUserRoles() {
    this.appService.getUserRoles().subscribe(
      (response) => {
        this.userRoles = response.data;
      },
      (err) => {},
      () => {}
    );
  }

  private getUserTypes() {
    this.appService.getUserTypes().subscribe(
      (response) => {
        this.userTypes = response.data;
        console.log(this.userTypes);
      },
      (err) => {},
      () => {}
    );
  }

  private getUserStatuses() {
    this.appService.getUserStatuses().subscribe(
      (response) => {
        this.userStatuses = response.data;
      },
      (err) => {},
      () => {}
    );
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

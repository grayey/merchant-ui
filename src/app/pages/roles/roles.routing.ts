import { Routes } from "@angular/router";
import { RoleDetailComponent } from "./role-detail/role-detail.component";
import { RolesComponent } from "./roles.component";


export const ROLES_ROUTES:Routes = [
    {
        path:"",
        component:RolesComponent
    },
    {
        path:":id",
        component:RoleDetailComponent
    },
]
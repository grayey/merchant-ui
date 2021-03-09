import { Routes } from "@angular/router";
import { MerchantCreateComponent } from "./merchant-create.component";
import { MerchantComponent } from "./merchant.component";


export const MERCHANTS_ROUTES:Routes = [
    {
        path:"",
        component:MerchantComponent
    },
    {
        path:"create",
        component:MerchantCreateComponent
    }
]
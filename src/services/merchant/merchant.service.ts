import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHandlerService } from "../api-handler.service";





@Injectable()
export class MerchantService{


    constructor(private apiHandler:ApiHandlerService){
        
    }



    /**
     * this method verifies a merchant's registration
     */
         public registerMerchant = (data):Observable<any> => {
            const url = `merchant/register`;
            return this.apiHandler.post(url, data);
        }
    
        

    /**
     * this method verifies a merchant's registration
     */
    public verifyRegistration = (data):Observable<any> => {
        const url = `merchant/verify-registration`;
        return this.apiHandler.post(url, data);
    }
    

    

}
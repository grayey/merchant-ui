import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHandlerService } from "../api-handler.service";




@Injectable()
export class RefundsService{

    constructor(private apiHandler:ApiHandlerService){
        
    }


    /**
     * this method returns an observble list of all refunded transactions
     */
    public getAllRefunds = ():Observable<any> => {
        const url = 'transaction/refunded';
        return this.apiHandler.get(url);
    }
    

}
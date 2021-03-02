import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHandlerService } from "../api-handler.service";
import { buildUrlParams } from "../../utils/helpers";




@Injectable()
export class RefundsService{

    public static REFUNDS_LIST_FILTER;

    constructor(private apiHandler:ApiHandlerService){
        
    }


    /**
     * this method returns an observble list of all refunded transactions
     */
    public getAllRefunds = ():Observable<any> => {
        const params = buildUrlParams(RefundsService.REFUNDS_LIST_FILTER);
        const url = `transaction/refunded/${params}`;
        return this.apiHandler.get(url);
    }
    

}
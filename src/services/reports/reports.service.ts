import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHandlerService } from "../api-handler.service";
import { buildUrlParams } from "../../utils/helpers";




@Injectable()
export class ReportsService{

    public static REFUNDS_LIST_FILTER;
    public static S_F_RATES_LIST_FILTER;
    public static MERCHANT_BALANCE_LIST_FILTER;

    constructor(private apiHandler:ApiHandlerService){
        
    }


    /**
     * this method returns an observble list of all refunded transactions
     */
    public getAllRefunds = ():Observable<any> => {
        const params = buildUrlParams(ReportsService.REFUNDS_LIST_FILTER);
        const url = `transaction/refunded/${params}`;
        return this.apiHandler.get(url);
    }
    

     /**
     * this method returns an observble list of success & failure rates for merchants
     */
    public getSuccessFailureRates = ():Observable<any> => {
        const params = buildUrlParams(ReportsService.S_F_RATES_LIST_FILTER);
        const url = `transaction/success-and-failure-rate/${params}`;
        return this.apiHandler.get(url);
    }

      /**
     * this method returns an observble list of merchants' balance
     */
    public getMerchantBalances = ():Observable<any> => {
        const params = buildUrlParams(ReportsService.MERCHANT_BALANCE_LIST_FILTER);
        const url = `report/merchant-balance/${params}`;
        return this.apiHandler.get(url);
    }

}
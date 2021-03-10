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

      /**
     * this method verifies a merchant's registration
     */
       public completeMerchantRegistration = (data):Observable<any> => {
        const url = `merchant/complete-registration`;
        return this.apiHandler.post(url, data);
    }


    /**
     * 
     * @returns 
     * This method returns a list of all business categories
     */
    public getAllBusinessCategories = ():Observable<any> =>{
        const url = `merchant/business-categories`;
        return this.apiHandler.get(url);
    }

    

    /**
     * 
     * @returns 
     * This method returns a list of all banks
     */
     public getAllBanks = ():Observable<any> =>{
        const url = `merchant/banks`;
        return this.apiHandler.get(url);
    }
    

    
    /**
     * 
     * @returns 
     * This method returns a list of all currencies
     */
     public getAllCurrencies = ():Observable<any> =>{
        const url = `merchant/currencies`;
        return this.apiHandler.get(url);
    }

      /**
     * 
     * @returns 
     * This method returns a list of all regions
     */
       public getAllRegions = ():Observable<any> =>{
        const url = `merchant/regions`;
        return this.apiHandler.get(url);
    }

    /**
     * 
     * @returns 
     * This method returns a list of all processing gateways
    */
       public getAllProcessingGateways = ():Observable<any> => {
        const url = `merchant/processing-gateways`;
        return this.apiHandler.get(url);
    }

    /**
     * 
     * @returns 
     * This method returns a list of all countries
    */
    public getAllCountries = ():Observable<any> =>{
        const url = `merchant/countries`;
        return this.apiHandler.get(url);
    }

    



    

}
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { buildUrlParams } from "src/utils/helpers";
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
     * this method updates a merchant's portal information
     */
           public updateMerchant = (data):Observable<any> => {
            const url = `merchant/update`;
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

    
  /**
     * 
     * @returns 
     * This method generates OTP for merchant self-onboarding
    */
    generateOTP = (data):Observable<any> => {
	return this.apiHandler.post('merchant/generate-otp',{...data});
    }

      /**
     * @returns 
     * This method verify OTP for merchant self-onboarding
    */
       verifyOTP = (data):Observable<any> => {
        return this.apiHandler.post('merchant/validate-otp',data);
    }

    
      /**
     * @returns 
     * This method self-onboards a merchant
    */
       completeMerchantSelfOnboard = (data):Observable<any> => {
           console.log({data});
        return this.apiHandler.post('merchant/self-onboard',data);
    }


     /**
     * @returns 
     * This method gets the list of self onboarded merchants
    */
      getSelfOnboarders = (paramData = {}):Observable<any> => {
        console.log({paramData});
        const url = `merchant/search-self-onboard/${buildUrlParams(paramData)}`
     return this.apiHandler.get(url);
 }

    

}
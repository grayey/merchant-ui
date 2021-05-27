import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHandlerService } from "../api-handler.service";
import { buildUrlParams } from "../../utils/helpers";
import * as fileSaver from "file-saver";




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
        const urlData = ReportsService.REFUNDS_LIST_FILTER;
        const { startDate, endDate } = urlData;
        urlData.refundStartDate = startDate;
        urlData.refundEndDate = endDate;
        delete urlData.startDate ;
        delete urlData.endDate;
        const params = buildUrlParams(urlData);
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

    /**
     * 
     * @param filterData 
     * this method downloads a report
     * 
     */

    downloadReport(reportType, filterData): any {
        let url = "transaction/download/";
        const { startDate, endDate } = filterData;

        switch(reportType){
            case "REFUNDS":
                url+="refunded";
                filterData.refundStartDate = startDate;
                filterData.refundEndDate = endDate;
                delete filterData.startDate ;
                delete filterData.endDate;
                break;
            case "MERCHANT_BALANCE":
                url += "merchant-balance"
                break;
            case "SFR":
                url +="success-failure-rate";
                break;
            default:
                return alert('Unknown report type')
        }
    
        const path = `${url}/${buildUrlParams(filterData)}`;
        return this.apiHandler.getFile(path).subscribe(
            (fileResponse)=>{
                this.handleDownload(fileResponse)
            },
            (error)=>{
                console.log({error})
            });
        
      }

       /**
   * 
   * @param response 
   * This method downloads a file
   */
  private handleDownload = (response: any): void => {
    const contentDispositionHeader = response.headers.get("Content-Disposition");
    const parts: string[] = contentDispositionHeader.split(";");
    const fileName = parts[1].split("=")[1];
    let blob = new Blob([response.body], {type: response.type});
    fileSaver.saveAs(blob, fileName);
  }

}
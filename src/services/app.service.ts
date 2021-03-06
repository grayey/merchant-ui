import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ApiHandlerService } from "./api-handler.service";
import { saveAs } from "file-saver/FileSaver";
import * as fileSaver from "file-saver";
import { environment } from "../environments/environment";
import { buildUrlParams } from "../utils/helpers";
import { UserService } from "./user/user.service";


export interface IBearerToken {
  access_token: string;
}

@Injectable()
export class AppService {

  appBaseUrl = environment.backend;

  user = null;
  authUser;
  isAdmin;
  constructor(private http: HttpClient, private authService: AuthService, private userService:UserService, private apiHandler:ApiHandlerService) {
    this.authUser = this.userService.getAuthUser();
    this.isAdmin = (this.authUser && !this.authUser.merchantId);
    
  }

  getUsers_old(pageNumber, pageSize, filterData): Observable<any>  {
    const { fullName, username } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/user?pageNumber=${pageNumber}&pageSize=${pageSize}&fullName=${fullName}&username=${username}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return this.getUsers(pageNumber, pageSize, filterData);

  }

  /**
   * 
   * @param pageNumber 
   * @param pageSize 
   * @param filterData 
   * This method return an observable list of users
   */
  public getUsers(pageNumber, pageSize, filterData): Observable<any> {
    const merchantId = this.getMerchantId() || 0;

    const paramData = {...{pageNumber, pageSize, merchantId}, ...filterData};
    const urlParams = buildUrlParams(paramData);
    const url = `user/${urlParams}`;
    return this.apiHandler.get(url);
  }


  public getRoles(pageNumber, pageSize, filterData): Observable<any> {
    const merchantId = this.getMerchantId() || 0;
    console.log({ filterData })
    const paramData = {...{pageNumber, pageSize,
      merchantId
    }, ...filterData};
    const urlParams = buildUrlParams(paramData);
    const url = `role/${urlParams}`;
    return this.apiHandler.get(url);
  }
  
  public getUserRoleById = (roleId) =>{
    const url = `role/${roleId}`;
    return this.apiHandler.get(url);
  }

 

  public assignTasksToRole = (roleId, functions) =>{
    const url = `role/assign-function`;
    const data = {
      roleId,
      functions
    }
    return this.apiHandler.post(url,data);
  }

  
  public createRole(data){
    const url = `role`;
    data.merchantId =  this.getMerchantId();
    return this.apiHandler.post(url,data);
  }

  public updateRole(data, roleId){
    const url = `role`;
    data.merchantId =  this.getMerchantId();
    data.id = roleId;
    return this.apiHandler.post(url,data);
  }
  //0bsolete
  getUploads_old(pageNumber, pageSize, filterData): any {
    const { type, status } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/upload-request?pageNumber=${pageNumber}&pageSize=${pageSize}&type=${type}&status=${status}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return this.getUploads(pageNumber, pageSize, filterData);
  }

  getUploads(pageNumber, pageSize, filterData): Observable<any> {
    const paramData = {...{pageNumber, pageSize}, ...filterData};
    const urlParams = buildUrlParams(paramData);
    const url = `upload-request/${urlParams}`;
    return this.apiHandler.get(url);
  }

  //0bsolete
  getUploadTypes_old(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/upload-request/types`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
    return this.getUploadTypes();
  }

  getUploadTypes(): Observable<any> {
    return this.apiHandler.get('upload-request/types');
  }

  getUploadStatuses(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/upload-request/status`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  //0bsolete
  getMerchants_old(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/merchant`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }
  
  getMerchants(): Observable<any> {
    return this.apiHandler.get('merchant');
  }

  getUserTypes(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/types`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  getUserRoles(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/roles`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  getUserStatuses(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/status`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  getTransactions(pageNumber, pageSize, filterData): any {
    const {
      gatewayTransactionReference,
      transactionDate,
      transactionStatus,
      amount,
      merchantTransactionReference,
      startDate,
      endDate,
      merchantId
    } = filterData;
    let url =  `/api/v1/transaction?pageNumber=${pageNumber}&pageSize=${pageSize}&gatewayTransactionReference=${gatewayTransactionReference}&transactionStartDate=${startDate}&transactionEndDate=${endDate}&amount=${amount}&transactionStatus=${transactionStatus}&merchantTransactionReference=${merchantTransactionReference}`;

    const paramData = {...{pageNumber, pageSize}, ...filterData};
    const urlParams = buildUrlParams(paramData);
    url = `/api/v1/transaction/${urlParams}`;
    url += merchantId ? `merchantId=${merchantId}`:"";
    return this.http.get(
      this.appBaseUrl + url
        ,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  confirmRefund(data){
    // return this.http.get("https://run.mocky.io/v3/e7bdbe25-0aee-4810-862f-21637d4a3beb");
    return this.apiHandler.post('transaction/refund',data);
  }

  confirmRequery(data){
    return this.apiHandler.post('transaction/re-query',data);
  }

  downloadTransactions(pageNumber, pageSize, filterData): Observable<HttpResponse<Blob>> {
    const {
      gatewayTransactionReference,
      transactionDate,
      transactionStatus,
      amount,
      merchantTransactionReference,
      startDate,
      endDate,
      reportType,
      merchantId
    } = filterData;
    let url = `/api/v1/transaction/download?pageNumber=${pageNumber}&pageSize=${pageSize}&reportType=${reportType}&gatewayTransactionReference=${gatewayTransactionReference}&transactionStartDate=${startDate}&transactionEndDate=${endDate}&amount=${amount}&transactionStatus=${transactionStatus}&merchantTransactionReference=${merchantTransactionReference}`;
    url += merchantId ? `&merchantId=${merchantId}`:"";
    return this.http.get(
      this.appBaseUrl +url,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
        observe: 'response',
        responseType: "blob",
      }
    );
  }

  downloadPlatformCostReport( filterData): Observable<HttpResponse<Blob>> {
    const {
      startDate,
      endDate,
      reportType,
      merchantId
    } = filterData;
    // const merchantId = this.getMerchantId();
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/download/platform-cost?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&merchantId=${merchantId}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
        observe: 'response',
        responseType: "blob",
      }
    );
  }

  

  getSettlements(pageNumber, pageSize, filterData): any {
    const { startDate, endDate } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/settlement?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getChargeBacks(pageNumber, pageSize, filterData): any {
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/charge-back?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getPlatformCost(pageNumber: string, pageSize: string, filterData: any): any {
    let { reportType, merchantId, endDate, startDate } = filterData;
    const oldParams = `?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}&reportType=${reportType}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    merchantId = this.getMerchantId(merchantId);
    const urlParams = buildUrlParams({...{pageNumber, pageSize, merchantId}, ...filterData})
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/platform-cost${urlParams}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  downloadPlatformCost(
    startDate: string,
    endDate: string,
    reportType: string,
    merchantId: number = 0
  ): any {
    let pageNumber: number = 1;
    let pageSize: number = 1;
    merchantId = this.getMerchantId(merchantId);
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/download/platform-cost?merchantId=${merchantId}&reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getRefundCost(pageNumber: string, pageSize: string, filterData: any): any {
    let { reportType, merchantId, endDate, startDate } = filterData;
    merchantId = this.getMerchantId(merchantId);
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/refund-cost?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}&reportType=${reportType}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  downloadtRefundCost(
    startDate: string,
    endDate: string,
    reportType: string,
    merchantId: number = 0
  ): any {
    let pageNumber: number = 1;
    let pageSize: number = 1;
    merchantId = this.getMerchantId(merchantId);
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/download/refund-cost?merchantId=${merchantId}&reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getChargebackCost(
    pageNumber: string,
    pageSize: string,
    filterData: any
  ): any {
    let { reportType, merchantId, endDate, startDate } = filterData;
    merchantId = this.getMerchantId(merchantId);
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/charge-back-cost?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}&reportType=${reportType}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  downloadChargebackCost(filterData: any): any {
    let { reportType, merchantId, endDate, startDate } = filterData;
    let pageNumber: number = 1;
    let pageSize: number = 1000;
    merchantId = this.getMerchantId(merchantId);
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/download/charge-back-cost?merchantId=${merchantId}&reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getReportTypes(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/transaction/report-types`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  loginUser_old(username: string, password: string): Observable<any> {
    // const params = new URLSearchParams();
    // params.append("username", username);
    // params.append("password", password);
    // params.append("grant_type", "password");
    // const config = {
    //   headers: {
    //     Authorization: "Basic Y29kZWlxLXBheW1lbnQtZ2F0ZXdheTpzZWNyZXQ=",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };
    // return this.http.post(
    //   this.appBaseUrl + "/oauth/token",
    //   params.toString(),
    //   config
    // );
    return this.loginUser(username, password);
  }

  loginUser(username: string, password: string): Observable<any> {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");
    ApiHandlerService.API_BASE_URL = this.appBaseUrl;
    return this.apiHandler.post('/oauth/token',params.toString());
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.appBaseUrl + "/api/v1/user", data);
  }

  uploadSettlementItem(data: any, date?:string): Observable<any> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    // return this.http.post(
    //   this.appBaseUrl + "/api/v1/settlement/upload",
    //   data,
    //   config
    // );
    let url = 'settlement/upload';
    if(date) url +=`?beginCountDate=${date}`;

    return this.apiHandler.postFile({},data,url);
  }

  uploadChargeBackItem(data: any, date?:string): Observable<any> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    // return this.http.post(
    //   this.appBaseUrl + "/api/v1/charge-back/upload",
    //   data,
    //   config
    // );
    let url = 'charge-back/upload';
    if(date) url +=`?beginCountDate=${date}`;
    return this.apiHandler.postFile({},data,url);
  }

  public getSecureRedirect = (gatewaySecureTransactionId) =>{
    const url = `transaction/secure-transaction-id/${gatewaySecureTransactionId}`;
    return this.apiHandler.get(url);
  }



  private getToken(): string {
    let bearerToken: IBearerToken = this.initEmptyData();
    const accessToken = this.authService.user;
    // console.log({ accessToken })
    Object.assign(bearerToken, accessToken);
    let token = "Bearer " + bearerToken.access_token;
    return token;
  }

  private initEmptyData(): IBearerToken {
    return <IBearerToken>{
      access_token: "",
    };
  }

  handleDownload(response: any): void {
    const contentDispositionHeader = response.headers.get("Content-Disposition");
    const parts: string[] = contentDispositionHeader.split(";");
    const fileName = parts[1].split("=")[1];
    let blob = new Blob([response.body], {type: response.type});
    fileSaver.saveAs(blob, fileName);
  }

  public getMerchantId = (merchantId = 0) =>{
    return this.isAdmin ? merchantId : this.authUser?.merchantId;
  }
  
}

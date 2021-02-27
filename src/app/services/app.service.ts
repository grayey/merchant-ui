import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { saveAs } from "file-saver/FileSaver";
import * as fileSaver from "file-saver";

export interface IBearerToken {
  access_token: string;
}

@Injectable()
export class AppService {
  //  appBaseUrl = "http://52.208.91.202:8085";
  // appBaseUrl = "http://3.10.80.41:8086";
  // appBaseUrl = "http://localhost:8080";
  appBaseUrl = "http://34.240.160.43:8085";

  user = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(pageNumber, pageSize, filterData): any {
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
  }

  getUploads(pageNumber, pageSize, filterData): any {
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
  }

  getUploadTypes(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/upload-request/types`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  getUploadStatuses(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/upload-request/status`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
  }

  getMerchants(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/merchant`, {
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });
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
    } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction?pageNumber=${pageNumber}&pageSize=${pageSize}&gatewayTransactionReference=${gatewayTransactionReference}&transactionStartDate=${startDate}&transactionEndDate=${endDate}&amount=${amount}&transactionStatus=${transactionStatus}&merchantTransactionReference=${merchantTransactionReference}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
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
    } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/download?pageNumber=${pageNumber}&pageSize=${pageSize}&reportType=${reportType}&gatewayTransactionReference=${gatewayTransactionReference}&transactionStartDate=${startDate}&transactionEndDate=${endDate}&amount=${amount}&transactionStatus=${transactionStatus}&merchantTransactionReference=${merchantTransactionReference}`,
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
    const { reportType, merchantId, endDate, startDate } = filterData;
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction/platform-cost?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}&reportType=${reportType}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
    const { reportType, merchantId, endDate, startDate } = filterData;

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
    const { reportType, merchantId, endDate, startDate } = filterData;
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
    const { reportType, merchantId, endDate, startDate } = filterData;
    let pageNumber: number = 1;
    let pageSize: number = 1000;
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

  loginUser(username: string, password: string): Observable<any> {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");
    const config = {
      headers: {
        Authorization: "Basic Y29kZWlxLXBheW1lbnQtZ2F0ZXdheTpzZWNyZXQ=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    return this.http.post(
      this.appBaseUrl + "/oauth/token",
      params.toString(),
      config
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.appBaseUrl + "/api/v1/user", data);
  }

  uploadSettlementItem(data: any): Observable<any> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    return this.http.post(
      this.appBaseUrl + "/api/v1/settlement/upload",
      data,
      config
    );
  }

  uploadChargeBackItem(data: any): Observable<any> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    return this.http.post(
      this.appBaseUrl + "/api/v1/charge-back/upload",
      data,
      config
    );
  }

  private getToken(): string {
    let bearerToken: IBearerToken = this.initEmptyData();
    const accessToken = this.authService.user;
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
  
}

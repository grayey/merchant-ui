import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export interface IBearerToken {
  access_token: string;
}

@Injectable()
export class AppService {
  // appBaseUrl = "http://localhost:8080";
  appBaseUrl = "http://3.10.80.41:8086";

  user = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(pageNumber, pageSize): any {
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/user?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  getUploads(pageNumber, pageSize): any {
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/upload-request?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
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

  getTransactions(pageNumber, pageSize): any {
    return this.http.get(
      this.appBaseUrl +
        `/api/v1/transaction?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
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

  uploadItem(data: any): Observable<any> {
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
}

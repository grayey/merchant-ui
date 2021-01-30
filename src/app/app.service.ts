import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AppService {
  appBaseUrl = "http://3.10.80.41:8086";

  user = null;

  constructor(private http: HttpClient) {}

  getUsers(id): any {
    return this.http.get(
      this.appBaseUrl + `/api/v1/user?pageNumber=1&pageSize=10`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  getUserTypes(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/types`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  getUserRoles(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/roles`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  getUserStatuses(): any {
    return this.http.get(this.appBaseUrl + `/api/v1/user/status`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  getTransactions(id): any {
    return this.http.get(
      this.appBaseUrl + `/api/v1/transaction?pageNumber=1&pageSize=10`,
      {
        headers: { "Content-Type": "application/json" },
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
    return this.http.post(this.appBaseUrl + "/oauth/token", params, config);
  }

  createUser(data): Observable<any> {
    console.log("request");
    return this.http.post(this.appBaseUrl + "/api/v1/user", data);
  }
}

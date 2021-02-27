import { UserService } from '../services/user/user.service';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';


/**
 *  Environment type configuration
 */

export class ApiConfig{

  constructor(private userService: UserService) {

    this.headers = {
      headers: this.setHeaders(), observe:'response'
     }

  }

  private static API_KEY = environment.API_KEY;
  public static REQUEST_CONTENT = 'json'; //e.g of other content: 'octet-stream' for file uploads
  public headers;



  /**
   * This is used to set headers on requests
   * @returns { HttpHeaders }
   */
  public setHeaders(): HttpHeaders {
    const headersConfig = new HttpHeaders();
    const contentOrAccept = `application/${ApiConfig.REQUEST_CONTENT}`;
    headersConfig.append('Content-Type', contentOrAccept);
    headersConfig.append('Accept', contentOrAccept);
    if (this.userService.isLoggedIn()) {
      headersConfig['Authorization'] = `${this.userService.getAuthUserToken()}`;
    }
    if (ApiConfig.API_KEY) {
      headersConfig['API-KEY'] = ApiConfig.API_KEY;
    }
    const X_JWT_TOKEN = localStorage.getItem('X_JWT_TOKEN');
    console.log({ X_JWT_TOKEN })
    if(X_JWT_TOKEN){
      headersConfig['x-jwt-token'] = X_JWT_TOKEN;
    }
    return headersConfig;
  }



}


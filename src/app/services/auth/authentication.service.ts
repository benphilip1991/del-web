import { Utils } from '@utils/common.utils';
import { credentials } from '@utils/app-constants.utils';
import { delApiServicesToken } from '@env/environment';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

// Either include in the providers array in the module
// or annotate this class as an injectable object to be provided
// in a given scope. This class can be 'autowired'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // @Inject - use for decorating function params
  // Inject delApiServices declared in the module
  constructor(
    @Inject(delApiServicesToken) private delApiServices,
    public utils: Utils,
    private http: HttpClient) { }

  /**
   * Build del-api auth url 
   * 
   * @returns string
   */
  getApiUrl(): string {

    let serviceBase = this.delApiServices;

    return serviceBase.delApiUrl + ':'
      + serviceBase.delApiPort + '/'
      + serviceBase.delApiVersion + '/'
      + serviceBase.authApi;
  }

  /**
   * Function accepts username and password, sends to
   * del-api and returns a token.
   * @request - POST to /api/v1/auth
   */
  getToken(email: string, password: string): Observable<Token> {

    let creds = {
      emailId: email,
      password: password
    };

    let tokenObservable = this.http.post<Token>(this.getApiUrl(), creds)
      .pipe(map((response) => {
        return response;
      }),
        catchError(this.utils.handleError)
      );

    return tokenObservable;
  }

  /**
   * If a token is present, validate and get user details.
   * @request - GET to /api/v1/auth
   */
  verifyTokenDetails(token: string): Observable<TokenDetails> {

    let options = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    }

    let tokenDetailsObservable = this.http.get<TokenDetails>(this.getApiUrl(), options)
      .pipe(map((response) => {
        return response;
      }),
        catchError(this.utils.handleError)
      );

    return tokenDetailsObservable;
  }


  /**
   * Set credentials and token in local storage
   * 
   * @param token 
   * @param isLoggedIn 
   */
  setCredentials(token?: string, userRole?: string, userId?: string) {
    localStorage.setItem(credentials.TOKEN, token);
    localStorage.setItem(credentials.ROLE, userRole);
    localStorage.setItem(credentials.USERID, userId);
  }
  
  /**
   * Clear stored credentials and user details
   */
  clearCredentials() {
    localStorage.removeItem(credentials.TOKEN);
    localStorage.removeItem(credentials.ROLE);
    localStorage.removeItem(credentials.USERID);
  }
}

/**
 * Create token response object
 */
interface Token {
  bearer: string
}

/**
 * Token verification response
 */
interface TokenDetails {
  userId: string,
  userRole: string,
  iat: number,
  exp: number
}
import { credentials } from './../../utils/app-constants.utils';
import { httpMessages } from '@app/utils/app-constants.utils';
import { delApiServicesToken } from '@env/environment';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

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
      + serviceBase.auth;
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
        catchError(this.handleError)
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
        catchError(this.handleError)
      );

    return tokenDetailsObservable;
  }

  /**
   * Hnadle errors on http calls to the auth API
   * This handler is valid for both the POST and GET APIs
   * 
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    console.log(error.message);

    if (error.status === httpMessages.CLIENT_ERRORS.BAD_REQUEST.httpCode
      || error.status === httpMessages.CLIENT_ERRORS.UNAUTHORIZED.httpCode) {
      return throwError(httpMessages.CLIENT_ERRORS.UNAUTHORIZED.responseMessageInvalidCreds);
    } else {
      return throwError(httpMessages.genericErrorMessage);
    }
  }

  /**
   * Set credentials and token in local storage
   * 
   * @param token 
   * @param isLoggedIn 
   */
  setCredentials(token?: string, userRole?: string) {
    localStorage.setItem(credentials.TOKEN, token);
    localStorage.setItem(credentials.ROLE, userRole);
  }
  
  /**
   * Clear stored credentials and user details
   */
  clearCredentials() {
    localStorage.removeItem(credentials.TOKEN);
    localStorage.removeItem(credentials.ROLE);
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
import { credentials } from './../../utils/app-constants.utils';
import { Utils } from '@utils/common.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delApiServicesToken } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(delApiServicesToken) private delApiServices,
    public utils: Utils,
    private http: HttpClient
  ) { }

 
  /**
   * Build the user API endpoint
   * 
   * @param userId 
   * @returns 
   */
  getApiUrl(userId?: string): string {

    let serviceBase = this.delApiServices;

    if(null != userId){
    return serviceBase.delApiUrl + ':'
      + serviceBase.delApiPort + '/'
      + serviceBase.delApiVersion + '/'
      + serviceBase.userApi + '/'
      + userId;
    }
    else{
      return serviceBase.delApiUrl + ':'
      + serviceBase.delApiPort + '/'
      + serviceBase.delApiVersion + '/'
      + serviceBase.userApi;
    }
  }
 
  /**
   * Fetch bearer token
   */ 
   getAPIHeader(token?: string) {
    let options = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    }
    return options;
  }

  /**
   * Fetch user details using userId. The token can be fetched
   * from the local storage.
   */
  getUserDetails(userId?: string, token?: string): Observable<UserDetails> {

    if (null == userId) {
      userId = localStorage.getItem(credentials.USERID);
    }
    if (null == token) {
      token = localStorage.getItem(credentials.TOKEN);
    }

    let options = this.getAPIHeader(token);    

    let userObservable = this.http.get<UserDetails>(this.getApiUrl(userId), options)
      .pipe(map((response) => {
        return response;
      }),
      catchError(this.utils.handleError)  
    );
    return userObservable;
  }

   /**
   *get all user list by giving the bearer token
   */
  getUserList(token?: string): Observable<UsersList> { 
    if (null == token) {
      token = localStorage.getItem(credentials.TOKEN);
    }

    let options = this.getAPIHeader(token);  

    let userObservable = this.http.get<UsersList>(this.getApiUrl(), options)
      .pipe(map((response) => {
        return response;
      }),
      catchError(this.utils.handleError)  
    );
    return userObservable;
  }

  /**
   * delete the user list from user record
   */ 
  removeUser(userId: string, token?: string): Observable<string> {
    if (null == token) {
      token = localStorage.getItem(credentials.TOKEN);
    }

    let options = this.getAPIHeader(token);  

    let userObservable = this.http.delete<string>(this.getApiUrl(userId), options)
      .pipe(map((response) => {
        return response;
      }),
      catchError(this.utils.handleError)  
    );
    return userObservable;
  }
  /**
   *adding new user to user list
   */ 
   addUserDetails(userDetails: any,token?: string): Observable<any> {
    if (null == token) {
      token = localStorage.getItem(credentials.TOKEN);
    }

    let options =this.getAPIHeader(token);  

    let userObservable = this.http.post<any>(this.getApiUrl(),userDetails, options)
      .pipe(map((response) => {
        return response;
      }),
      catchError(this.utils.handleError)  
    );
    return userObservable;
  }
}

/**
 * User details object
 */
interface UserDetails {

  _id: string,
  firstName: string,
  lastName: string,
  emailId: string,
  age: number,
  sex: string,
  userRole: string
}

/**
 * 
 */
interface UsersList {
  users: [
    UserDetails
  ]
}
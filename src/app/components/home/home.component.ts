import { credentials } from './../../utils/app-constants.utils';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _isLoggedIn: boolean;
  private _selectedDashboard: string;

   constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyLoginState();
  }

  /**
  * If a token is found, validate it and proceed
  * 
  * @param token 
  */
  verifyUserToken(token: string) {

    this.authenticationService.verifyTokenDetails(token).subscribe(
      (response) => {
        this._isLoggedIn = true;
      }, (error) => {
        console.log(error)
        this.authenticationService.clearCredentials();
        this._isLoggedIn = false;

        // Navigate to login form if creds check fails
        this.router.navigate(['/'])
      }
    )
  }

  /**
   * Switch to the dashboard selected in the sidebar
   * 
   * @param dashboardName 
   */
  switchDashboard(dashboardName: string) {
    this._selectedDashboard = dashboardName;
  }

  /**
   * Called on Init to check user login state.
   * If authenticated, redirect to home page
   */
  verifyLoginState() {
    this.verifyUserToken(localStorage.getItem(credentials.TOKEN));
  }

  /**
   * Component accessors
   */
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get selectedDashboard() {
    return this._selectedDashboard; 
  }
}

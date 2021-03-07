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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

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
          // No need to do anything
          
        }, (error) => {
          console.log(error)
          this.authenticationService.clearCredentials();

          // Navigate to login form if creds check fails
          this.router.navigate(['/'])
        }
      )
    }
  
    /**
     * Called on Init to check user login state.
     * If authenticated, redirect to home page
     */
    verifyLoginState() {
      this.verifyUserToken(localStorage.getItem(credentials.TOKEN));
    }
}

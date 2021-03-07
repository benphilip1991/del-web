import { credentials } from './../../utils/app-constants.utils';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Class variables
  private _isLoginSuccess: boolean = true;
  private _errorMessage: string = '';

  // Angular forms system works with a FormGroup
  form: FormGroup;

  // Inject required objects.
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  /**
   * Build login form group on init
   */
  ngOnInit(): void {

    // Verify login state and proceed to home if logged in
    this.verifyLoginState();

    // Use FormGroup or FormBuilder. FormGroup can be created here, but will tightly couple it
    // with the component.
    // Using formBuilder allows IoC and decouples the code. Use formBuilder.group and .control instead
    // of FormGroup and FormControl
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      password: this.formBuilder.control('', Validators.compose([
        Validators.required
      ]))
    });
  }

  /**
   * Authenticate user and get token. 
   * Initially registered to the onSubmit event
   * 
   * @param loginItem
   */
  userLogin(loginItem) {

    this.authenticationService.getToken(loginItem.email, loginItem.password).subscribe(
      (response) => {
        this.verifyUserToken(response.bearer);
        this._isLoginSuccess = true;
      }, (error) => {
        this._isLoginSuccess = false;
        this._errorMessage = error;
      }
    );
  }

  /**
   * If a token is found, validate it and proceed
   * 
   * @param token 
   */
  verifyUserToken(token: string) {

    this.authenticationService.verifyTokenDetails(token).subscribe(
      (response) => {
        this._isLoginSuccess = true;
        this.authenticationService.setCredentials(token, response.userRole);

        // Navigate to the home page on successful authentication
        this.router.navigate(['/home'])
      }, (error) => {
        console.log(error)
        this.authenticationService.clearCredentials();
        this._isLoginSuccess = false;
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

  /**
   * Component accessors
   */
  get isLoginSuccess() {
    return this._isLoginSuccess;
  }

  get errorMessage() {
    return this._errorMessage;
  }
}

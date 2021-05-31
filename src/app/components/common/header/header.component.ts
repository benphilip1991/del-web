import { UserService } from "@services/user/user.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/services/auth/authentication.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class AppHeaderComponent implements OnInit {
  private _userName: string;
  private _selectedDashboard: string;
  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter();
  @Input("loggedIn") private _isLoggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Authentication has passed if header is loaded. Get username
    this.getUserName();
  }

  // Clear localstorage and redirect to login page
  performLogout() {
    this.authenticationService.clearCredentials();
    this.router.navigate(["/login"]);
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
   * Get the logged-in user's name using the set userId
   */
  getUserName() {
    if (!this._isLoggedIn) {
      this.clearCredsAndLogout();
    }

    this.userService.getUserDetails().subscribe(
      (response) => {
        this._userName = response.firstName + " " + response.lastName;
      },
      (error) => {
        // If user details could not be fetched, details in local cache are invalid.
        // Logout and force sign-in
        this.clearCredsAndLogout();
      }
    );
  }

  clearCredsAndLogout() {
    this.authenticationService.clearCredentials();
    this._isLoggedIn = false;
    this.router.navigate(["/login"]);
  }

  /**
   * Component accessors
   */
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get userName() {
    return this._userName;
  }
}
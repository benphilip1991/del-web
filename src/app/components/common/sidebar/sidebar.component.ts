import { Router } from '@angular/router';
import { credentials, userRoles } from '@utils/app-constants.utils';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faUser, faCubes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input('loggedIn') private _isLoggedIn: boolean;
  @Output() private sidebarMenuSelectionEvent = new EventEmitter<string>();

  // FA Icons
  user: IconDefinition = faUser;
  application: IconDefinition = faCubes;

  // Active element
  private _selectedElem: string = 'user';

  private _userRole: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Verify user profile and set appropriate flags
    this.verifyUserProfile();
  }

  /**
   * Get the clicked sidebar item and set as active
   * 
   * @param event 
   */
  toggleView(event) {
    this._selectedElem = event.currentTarget.id;
    this.sidebarMenuSelectionEvent.emit(this._selectedElem);
  }

  /**
   * Check user profile type. Only admins can see all users
   */
  verifyUserProfile() {

    // Verify user profile type
    this.authService.verifyTokenDetails(localStorage.getItem(credentials.TOKEN))
      .subscribe((response) => {
        this._userRole = response.userRole;

        // Set default active element Applications - users can't see other users
        if(response.userRole === userRoles.PATIENT || response.userRole === userRoles.DEVELOPER) {
          this._selectedElem = 'app'
        } else {
          this._selectedElem = 'user'
        }
        this.sidebarMenuSelectionEvent.emit(this._selectedElem);
      }, (error) => {
        this.authService.clearCredentials();
        this.router.navigate(['/login']);
      })
  }

  /**
   * Component accessors
   */
  get userRole() {
    return this._userRole;
  }

  get selectedElem() {
    return this._selectedElem;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "@services/user/user.service";
import { Router } from "@angular/router";
import { Input } from "@angular/core";
import { AuthenticationService } from "@app/services/auth/authentication.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { pageDetails } from "@app/utils/app-constants.utils";
import { AddUserDialogueComponent } from "@components/common/add-user-dialogue/add-user-dialogue.component";
import { ConfirmationDialogComponent } from "@components/common/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "users-dashboard",
  templateUrl: "./users-dashboard.component.html",
  styleUrls: ["./users-dashboard.component.scss"],
})
export class UsersDashboardComponent implements OnInit {
  users: any[];
  page: number;
  pageSize: number;
  @Input("loggedIn") private _isLoggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.page = pageDetails.page;
    this.pageSize = pageDetails.pageSize;
    this.getUserList();
  }

  //show user list in user profile dialogue
  showProfile(user) {
    this.router.navigate(["/userProfile",user._id]);
  }

  //get all user list
  getUserList() {
    this.userService.getUserList().subscribe(
      (response) => {
        this.users = response.users;
      },
      (error) => {}
    );
  }

  // delete the user from the seleted userid
  openDialog(userId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: userId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }

  //add user detail
  addUser() {
    let dialogRef = this.dialog.open(AddUserDialogueComponent, {
      height: "640px",
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.getUserList();
      }
    });
  }

  //user logout
  clearCredsAndLogout() {
    this.authenticationService.clearCredentials();
    this._isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import {Input} from '@angular/core';
import { UserProfileDialogueComponent } from '../common/user-profile-dialogue/user-profile-dialogue.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserDialogueComponent } from '../common/add-user-dialogue/add-user-dialogue.component';

@Component({
  selector: 'users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
  Users : any[]; 
  page=1;
  pageSize=5;
  userName : string;
   @Input('loggedIn') private _isLoggedIn: boolean;
    constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }
  //show user list in user profile dialogue
  showProfile(user){
    let dialogRef = this.dialog.open(UserProfileDialogueComponent, {
    height: '400px',
    width: '500px',
    data: {
      user: user
    }
    });
  }
  //get all user list 
  getUserList() {
    this.userService.getUserList().subscribe(
    (response) => {
      this.Users = response.users;
    }, (error) => {
    }
  
    );
  }
  // delete the user from the seleted user id
  removeuser(userId){
    this.userService.removeUser(userId).subscribe(
    (response) => {
     this.Users = this.Users.filter(user => user._id !== userId) 
    }, (error) => {
    }
    );
  }
  //add user detail 
  addUser(){
    let dialogRef = this.dialog.open(AddUserDialogueComponent, {
    height: '640px',
    width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
    if(!!result){
      this.getUserList();
    }
    });
  }
  //user logout 
  clearCredsAndLogout() {
    this.authenticationService.clearCredentials();
    this._isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

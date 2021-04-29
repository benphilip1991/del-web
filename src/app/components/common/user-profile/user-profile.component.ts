import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { Router } from "@angular/router";
import { UserService } from '@app/services/user/user.service';
import { credentials, sex, userRoles } from '@app/utils/app-constants.utils';
import { UserDetailsComponent } from '../user-details/user-details.component';


@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  users: any;
  user: any;
  id: string;
  userDetails: any;
  isEditable: boolean = false;
  showFiller: boolean = false;
  form: FormGroup;
  roles: Array<String>;
  userSex: Array<String>;
  private _isLoggedIn: boolean;
  private _selectedDashboard: string;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.getUserList();
    });
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(""),
      lastName: this.formBuilder.control(""),
      emailId: this.formBuilder.control(""),
      age: this.formBuilder.control(""),
      sex: this.formBuilder.control(""),
      password: this.formBuilder.control(""),
      userRole: this.formBuilder.control(""),
    });
    this.roles = Object.values(userRoles);
    this.userSex = Object.values(sex);
  }

  //get all user list
  getUserList() {
    if (!!this.id) {
      this.userService.getUserDetails(this.id).subscribe(
        (response) => {
          this.userDetails = response;
        },
        (error) => {}
      );
    }
  }

  editUserDetail(user) {
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      height: "90%",
      width: "350%",
      data: {
        user: user,
      },
    });
  }

  updateAssignment() {}
}

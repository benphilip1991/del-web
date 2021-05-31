import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UserService } from "@app/services/user/user.service";
import { sex, userRoles } from "@app/utils/app-constants.utils";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { UpdateAssignmentComponent } from "../update-assignment/update-assignment.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: any;
  applicationsIcon: any;
  applications: any;
  id: string;
  userDetails: any;
  userApplications: any;
  isEditable: boolean = false;
  isIcon: boolean = false;
  form: FormGroup;
  roles: Array<String>;
  userSex: Array<String>;
  iconFlag: boolean = false;
  iconUrl = "http://localhost:3050/api/v1/application/package/";
  icon: Array<String> = [];
  iconName: Array<String> = [];
  appId: Array<String> = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.getUserList();
      this.getUserApplication();
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

  //edit user details
  editUserDetail(user) {
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      height: "90%",
      width: "350%",
      data: {
        user: user,
      },
    });
  }

  //Get all the application assigned to user
  getUserApplication() {
    if (!!this.id) {
      this.userService.getApplicationDetails(this.id).subscribe(
        (response) => {
          this.userApplications = response.applications;
          if (this.userApplications) {
            this.getUserApplicationIcon(this.userApplications);
          }
        },
        (error) => {}
      );
    }
  }

  //Function to form the image url and add it in array
  getUserApplicationIcon(application) {
    for (let i = 0; i < application.length; i++) {
      this.iconFlag = true;
      this.icon.push( this.iconUrl +application[i].applicationId +"/" +application[i].applicationUrl +"/icon");
      this.iconName.push(application[i].applicationUrl);
      this.appId.push(application[i].applicationId);
    }
  }

  //Update function to add and remove the application 
  updateAssignment() {
    let dialogRef = this.dialog.open(UpdateAssignmentComponent, {
      height: "90%",
      width: "70%",
      data: {
        icon: this.icon,
        iconName: this.iconName,
        appId: this.appId,
        userId: this.id,
      },
    });
  }
}
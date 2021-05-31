import { Component, Inject, OnInit } from "@angular/core";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserService } from "@app/services/user/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-assignment",
  templateUrl: "./update-assignment.component.html",
  styleUrls: ["./update-assignment.component.scss"],
})
export class UpdateAssignmentComponent implements OnInit {
  icon: Array<String> = [];
  iconName: Array<String> = [];
  appId: Array<String> = [];
  removeApp: any;
  userId: any;
  appDetails: any;
  listApp: any;
  iconUrl = "http://localhost:3050/api/v1/application/package/";
  iconAdd: Array<String> = [];
  iconNameAdd: Array<String> = [];
  appIdAdd: Array<String> = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UpdateAssignmentComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.icon = this.data.icon;
    this.iconName = this.data.iconName;
    this.appId = this.data.appId;
    this.userId = this.data.userId;
    this.listApplications();
  }

  //get all the application available
  listApplications() {
    this.userService.listApplication().subscribe(
      (response) => {
        this.listApp = response.applications;
        this.getApplicationsList(this.listApp);
      },
      (error) => {}
    );
  }

  //Function to form the image url and add it in array
  getApplicationsList(listApp) {
    for (let i = 0; i < listApp.length; i++) {
      if (this.appId.includes(listApp[i]._id)) {
      } else {
        if (!this.appIdAdd.includes(listApp[i]._id)) {
          this.iconAdd.push(this.iconUrl +listApp[i]._id +"/" +listApp[i].applicationUrl +"/icon" );
          this.iconNameAdd.push(listApp[i].applicationUrl);
          this.appIdAdd.push(listApp[i]._id);
        }
      }
    }
  }

  //adding new application to user list
  addApplication(index) {
    this.appDetails = {
      applicationId: this.appIdAdd[index],
      operation: "add",
      addedBy: this.userId,
    };
    if (this.userId) {
      this.userService.updateApplicationDetail(this.userId, this.appDetails).subscribe(
          (response) => {
            this.removeApp = response;
            this.toastr.success("Application Added");
            let temp = this.iconAdd.splice(index, 1);
            this.icon.push(temp[0]);
            let tempName = this.iconNameAdd.splice(index,1);
            this.iconName.push(tempName[0]);
            const tempID = this.appIdAdd.splice(index, 1);
            this.appId.push(tempID[0]);
          },
          (error) => {
            this.toastr.error("Application cannot be Assigned");
          }
        );
    }
  }

  //removing the application from user list
  removeApplication(index) {
    this.appDetails = {
      applicationId: this.appId[index],
      operation: "delete",
      addedBy: this.userId,
    };
    if (this.userId) {
      this.userService.updateApplicationDetail(this.userId, this.appDetails).subscribe(
          (response) => {
            this.removeApp = response;
            this.toastr.success("Application Deleted");
            let temp = this.icon.splice(index, 1);
            this.iconAdd.push(temp[0]);
            let tempName = this.iconName.splice(index, 1);
            this.iconNameAdd.push(tempName[0]);
            const tempID = this.appId.splice(index, 1);
            this.appIdAdd.push(tempID[0]);
          },
          (error) => {}
        );
    }
  }
}
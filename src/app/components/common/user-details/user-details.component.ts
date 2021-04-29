import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { sex, userRoles } from '@app/utils/app-constants.utils';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  form: FormGroup;
  roles: Array<String>;
  userSex: Array<String>;
  @ViewChild("closebutton") closebutton;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(""),
      lastName: this.formBuilder.control(""),
      emailId: this.formBuilder.control(""),
      age: this.formBuilder.control(""),
      sex: this.formBuilder.control(""),
      password: this.formBuilder.control(""),
      userRole: this.formBuilder.control(""),
    });
    this.userSex = Object.values(sex);
  }
}
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "@app/services/user/user.service";
import { sex, userRoles } from "@app/utils/app-constants.utils";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-user-dialogue",
  templateUrl: "./add-user-dialogue.component.html",
  styleUrls: ["./add-user-dialogue.component.scss"],
})
export class AddUserDialogueComponent implements OnInit {
  // Angular forms system works with a FormGroup
  form: FormGroup;
  roles: Array<String>;
  userSex: Array<String>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserDialogueComponent>
  ) {}

  ngOnInit(): void {
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

  //add new user to exsisting user list
  addUser() {
    //type conversion for age from string to int
    if ((this.form.value.sex) == "Prefer not to mention"){
      this.form.value.sex = "none";
    }
    const formvalue = {
        ...this.form.value,
        age: parseInt(this.form.value.age),
      };
    this.userService.addUserDetails(formvalue).subscribe(
      (response) => {
        this.toastr.success("User Added, Successfully");
        this.dialogRef.close(response);
      },
      (error) => {}
    );
  }
}
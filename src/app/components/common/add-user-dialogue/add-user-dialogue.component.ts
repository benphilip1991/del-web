import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-add-user-dialogue',
  templateUrl: './add-user-dialogue.component.html',
  styleUrls: ['./add-user-dialogue.component.scss']
})
export class AddUserDialogueComponent implements OnInit {
    profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    age: new FormControl(''),
    sex: new FormControl(''),
    password: new FormControl(''),
    userRole: new FormControl(''),
  });
  
  constructor(private userService : UserService,
    public dialogRef: MatDialogRef<AddUserDialogueComponent>) { }
  ngOnInit(): void {}
  //add new user to user list
  adduser(){
    //type conversion for age from string to int
  const formvalue={...this.profileForm.value,age:parseInt(this.profileForm.value.age)}
    this.userService.addUserDeatils(formvalue).subscribe(
      (response) => {
              this.dialogRef.close(response);
      }, (error) => {
        console.log("Error"+Response);
      }
      );
  }
}
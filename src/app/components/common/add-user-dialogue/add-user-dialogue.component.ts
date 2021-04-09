import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-add-user-dialogue',
  templateUrl: './add-user-dialogue.component.html',
  styleUrls: ['./add-user-dialogue.component.scss']
})
export class AddUserDialogueComponent implements OnInit {
  // Angular forms system works with a FormGroup
  form: FormGroup;

   constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogueComponent>
  ) {}

  ngOnInit(): void {
       this.form = new FormGroup({
       firstName: new FormControl(''),
       lastName: new FormControl(''),
       emailId: new FormControl(''),
       age: new FormControl(''),
       sex: new FormControl(''),
       password: new FormControl(''),
       userRole: new FormControl(''),
      });
  }

  //add new user to exsisting user list
  addUser(){
  //type conversion for age from string to int
      const formvalue={...this.form.value,age:parseInt(this.form.value.age)}
      this.userService.addUserDeatils(formvalue).subscribe(
            (response) => {
                    this.dialogRef.close(response);
            }, (error) => {
              console.log("Error"+Response);
            }
      );
  }
}
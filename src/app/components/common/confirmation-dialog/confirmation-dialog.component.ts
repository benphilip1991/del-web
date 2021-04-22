import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  id:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private userService : UserService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    this.id= this.message;
  }

  //remove user from the user list using userid
  removeuser(): void{
    this.userService.removeUser(this.id).subscribe(
      (response) => {
          this.dialogRef.close(true);
          this.toastr.success('User Deleted');
      }, (error) => {
         this.dialogRef.close(false);
         this.toastr.success('Admin cannot be removed');
      }
    );
  }
}
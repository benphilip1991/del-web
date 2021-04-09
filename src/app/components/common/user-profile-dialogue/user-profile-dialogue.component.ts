import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-dialogue',
  templateUrl: './user-profile-dialogue.component.html',
  styleUrls: ['./user-profile-dialogue.component.scss']
})
export class UserProfileDialogueComponent implements OnInit {
  user :any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.user=this.data.user;
  }
}

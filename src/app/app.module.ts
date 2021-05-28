import { Utils } from '@utils/common.utils';
import { UserService } from '@app/services/user/user.service';
import { AuthenticationService } from '@app/services/auth/authentication.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { ToastrModule } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { delApiServicesToken, environment } from '@env/environment';
import { HomeComponent } from './components/home/home.component';
import { AppHeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { AppDashboardComponent } from './components/app-dashboard/app-dashboard.component';
import { AddUserDialogueComponent } from './components/common/add-user-dialogue/add-user-dialogue.component';
import { ConfirmationDialogComponent } from './components/common/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsComponent } from './components/common/user-details/user-details.component';
import { UserProfileComponent } from './components/common/user-profile/user-profile.component';
import { UpdateAssignmentComponent } from './components/common/update-assignment/update-assignment.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,  
    MatMenuModule,
    ToastrModule.forRoot({
    timeOut: 10000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppHeaderComponent,
    SidebarComponent,
    UsersDashboardComponent,
    AppDashboardComponent,
    ConfirmationDialogComponent,
    AddUserDialogueComponent,
    UserDetailsComponent,
    UserProfileComponent,
    UpdateAssignmentComponent
  ],
  // Not required if using @Injectable but adding for readability
  providers: [
    { provide: delApiServicesToken, useValue: environment.delApiServices },
    AuthenticationService,
    UserService,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
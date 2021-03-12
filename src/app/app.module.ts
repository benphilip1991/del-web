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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { delApiServicesToken, environment } from '@env/environment';
import { HomeComponent } from './components/home/home.component';
import { AppHeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent }
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppHeaderComponent,
    SidebarComponent
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

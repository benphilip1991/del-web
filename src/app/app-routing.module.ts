import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { UserProfileComponent } from './components/common/user-profile/user-profile.component';

// Set application page routes - path to component map
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "all" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "userProfile/:id", component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule {}

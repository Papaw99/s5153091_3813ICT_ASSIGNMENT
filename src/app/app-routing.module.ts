import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountManagementComponent } from './account-management/account-management.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account-management', component: AccountManagementComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

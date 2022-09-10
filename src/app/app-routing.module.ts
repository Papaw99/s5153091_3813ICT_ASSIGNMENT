import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { GroupsComponent } from './groups/groups.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account-management', component: AccountManagementComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'create-user', component: CreateUserComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

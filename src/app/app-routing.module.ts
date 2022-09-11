import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { GroupsComponent } from './groups/groups.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditPermsComponent } from './edit-perms/edit-perms.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ChannelsComponent } from './channels/channels.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AddToGroupComponent } from './add-to-group/add-to-group.component';
import { AddToChannelComponent } from './add-to-channel/add-to-channel.component';
import { ChannelComponent } from './channel/channel.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'account-management', component: AccountManagementComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'edit-perms', component: EditPermsComponent},
  {path: 'delete-user', component: DeleteUserComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: 'channels/:groupID', component: ChannelsComponent},
  {path: 'create-channel/:groupID', component: CreateChannelComponent},
  {path: 'add-to-group/:groupID', component: AddToGroupComponent},
  {path: 'add-to-channel/:channelID', component: AddToChannelComponent},
  {path: 'channel/:channelID', component: ChannelComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

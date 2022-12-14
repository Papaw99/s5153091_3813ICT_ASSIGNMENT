import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountManagementComponent,
    GroupsComponent,
    CreateUserComponent,
    EditPermsComponent,
    DeleteUserComponent,
    CreateGroupComponent,
    ChannelsComponent,
    CreateChannelComponent,
    AddToGroupComponent,
    AddToChannelComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

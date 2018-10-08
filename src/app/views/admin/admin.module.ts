import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatTableModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { SpotComponent } from './spot/spot.component';
import { EventComponent } from './event/event.component';
import { ActivityComponent } from './activity/activity.component';
import { ReversePipe } from '../../shared/pipes/reverse.pipe';
import { SharedModule } from '../../shared/shared.module';
import { SubactivityComponent } from './subactivity/subactivity.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatSelectModule
  ],
  declarations: [
    ProfileComponent, 
    EditProfileComponent,
    SpotComponent,
    EventComponent,
    ActivityComponent,
    SubactivityComponent,
    UsersComponent,
  ]
})
export class AdminModule { }

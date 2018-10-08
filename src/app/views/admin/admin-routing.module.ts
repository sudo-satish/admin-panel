import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SpotComponent } from './spot/spot.component';
import { EventComponent } from './event/event.component';
import { ActivityComponent } from './activity/activity.component';
import { SubactivityComponent } from './subactivity/subactivity.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'spot',
    component: SpotComponent
  },
  {
    path: 'event',
    component: EventComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'activity/:activityId/subactivity',
    component: SubactivityComponent
  },
  {
    path: 'user',
    component: UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

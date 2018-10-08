import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ContainerComponent } from './layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'password-reset/:token',
    component: LoginComponent
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
 
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule'
      },
      
      {
        path: 'meta',
        loadChildren: './views/meta/meta.module#MetaModule'
      },
      // {
      //   path: 'users',
      //   loadChildren: './views/users/users.module#UsersModule'
      // },
      // {
      //   path: 'restaurants',
      //   loadChildren: './views/restaurants/restaurants.module#RestaurantsModule'
      // },
      // {
      //   path: 'acc-mgm',
      //   loadChildren: './views/account-management/account-management.module#AccountManagementModule'
      // },
      // {
      //   path: 'cat-mgm',
      //   loadChildren: './views/cat-management/cat-management.module#CatManagementModule'
      // }
    ],
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

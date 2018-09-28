import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccMainComponent } from './acc-main/acc-main.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerProviderProfileComponent } from './seller-provider-profile/seller-provider-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccMainComponent,
    children: [
      {
        path: 'seller-list',
        component: SellerListComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'provider-list',
        component: ProviderListComponent
      },
      {
        path: 'product-list/:sellerId',
        component: ProductListComponent
      },
      {
        path: 'user-profile/:userId',
        component: UserProfileComponent
      },
      {
        path: 'seller-provider-profile/:userId',
        component: SellerProviderProfileComponent
      },
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }

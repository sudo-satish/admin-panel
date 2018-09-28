import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { MatModuleModule } from './mat-module.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContainerComponent } from './layout/container/container.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { AccountManagementModule } from './views/account-management/account-management.module';
import { DialogOverviewExampleDialog } from './views/account-management/product-list/product-list.component';
// import { DialogOverviewExampleDialog } from './views/account-management/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    MatModuleModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccountManagementModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }

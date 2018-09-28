import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule    
  ],
  providers: [
    AuthService,
    CommonService,
    AuthGuard
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    NotificationComponent
  ],
  declarations: [HeaderComponent, 
    FooterComponent, 
    NotificationComponent,
    NotFoundComponent,
    LoginComponent,
  ]
})
export class SharedModule { }

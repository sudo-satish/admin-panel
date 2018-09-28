import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot){
    if(this.authService.isLoggedIn())
      return true;
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
  }

}

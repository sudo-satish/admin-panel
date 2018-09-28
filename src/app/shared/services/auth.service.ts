import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }
  
  isLoggedIn(){
    var token = localStorage.getItem('token');
    if(token)
      return true;
    else
      return false;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');
    this.router.navigate(['/']);
    return true;
  }

  getLoginUser() {
    return JSON.parse(localStorage.getItem('adminData'));
  }
}

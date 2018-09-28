import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  environment = environment;
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  forgotPass = 0; // 1= enter email 2= change pass
  errorMessage = '';
  resetToken;
  buttonLoading  = false; 
  emailV = '';

  login(data){
    this.errorMessage = '';
    this.http.post('/admin/api/signin', data)
      .subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.data && response.data.access_token) {
            this.createToken(response.data.access_token, response.data);
          } else {
            this.errorMessage = 'Something went wrong';
          }
      },
      this.errorHandler.bind(this));
  }

  createToken(token, adminData){
    localStorage.setItem('token', token);
    delete adminData.password;
    localStorage.setItem('adminData', JSON.stringify(adminData));
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/dashboard']);
    this.commonService.toggleSnackBar('Logged in Successfully');
  }

  forgotPassword(data){
    this.http.post('/admin/api/forgotPassword', data)
      .subscribe((response: any) => {
        if(response && response['message'] ) this.errorMessage = response['message'];
        this.forgotPass = 2;
      },
      this.errorHandler.bind(this));
  }

  errorHandler(error) {
    if (error && error.error['error']) {
      this.errorMessage = error.error['error'];
    } else {
      this.errorMessage = 'Something went wrong';
    }
  }
  resetPass(value){
    if(value.password !== value.Cpassword)
      this.errorMessage = 'Confirm Password does not match';
    else {
      let url = '/admin/api/resetPassword';
      this.http.post( url, value)
        .subscribe((response: any) => {
          this.forgotPass = 0;
          this.errorMessage = '';
          if(response && response['message'] ) this.errorMessage = response['message'];
        },
      this.errorHandler.bind(this));
    }
  }

  ngOnInit() {
    if(localStorage.getItem('token'))
      this.router.navigate(['/dashboard']);
    else{
      this.route.paramMap
      .subscribe(response => {
        var token = response.get('token');
        console.log('url token ', token);
        if(token){
          this.resetToken = token;
          this.forgotPass = 2;
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private _auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }
  
  adminId;
  adminData;
  newpass;
  errMessage = '';
  environment = environment;

  matchPassword(pass){
    if(this.newpass !== pass)
      this.errMessage = 'Password does not match';
    else this.errMessage = '';
    return true;
  }

  changePassword(form) {
    let data = form.value;

    var putData = {
      newPassword: data.newPass,
      oldPassword: data.oldPass
    }

    this.http.put('/admin/api/changePassword', putData)
      .subscribe(response => {
        console.log('change_password ', response);
        if(response) {
          this.commonService.toggleSnackBar(response['message']);
        }
        else this.errMessage = "Something Went wrong";          
      }, error => {
        
        if (error && error.error && error.error.error ) {
          // console.log('1 => ', error.error.error);
          this.errMessage = error.error.error;
          // this.commonService.toggleSnackBar(error.error.error);
        } else {
          this.errMessage = 'Something Went wrong';
          // this.commonService.toggleSnackBar('Something Went wrong');
        }
      })
  }

  ngOnInit() {
    this.adminData = this._auth.getLoginUser();
  }

  editForm(adminData, form) {
    console.log(form);
    
    for(let key in adminData) {
      let value = adminData[key];
      if(form.controls[key]) {
        form.controls[key].setValue(value);
      }
    }
  }

  file;
  onFileChanged($event) {
    this.file = $event.target.files[0];
  }

  updateProfile(form: NgForm) {
    let formData = new FormData();
    let data = form.value;
    for(let key in data) {
      let value = data[key];
      formData.append(key, value);
    }

    if(this.file) {
      formData.append('ProfileImage', this.file);
    }

    let url = `/admin/api/updateProfile`;

    this.http.post(url, formData).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("adminData", JSON.stringify(response['data']));
        location.reload();
      }, this.defaultErrorHandler.bind(this)
    )
  }

  defaultErrorHandler(error) {
    console.log(error);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }
  
  profileForm: FormGroup;

  environment = environment;
  adminData: any;
  // adminData = {
  //   row_id: '',
  //   name: '',
  //   email: '',
  //   thumbnail: '',
  //   mobile_number: '',
  //   address: '',
  //   location: ''
  // };

  updateAdminProfile(){
    var fd = new FormData();
    fd.append('name', this.adminData.name);
    fd.append('email', this.adminData.email);
    fd.append('mobile_number', this.adminData.mobile_number);
    fd.append('address', this.adminData.address);
    // fd.append('location', this.adminData.location);
    fd.append('thumbnail', this.adminData.thumbnail );

    this.http.put(`/admin/updateAdminDetail/${this.adminData.row_id}`, fd)
      .subscribe(response => {
        console.log(response);
        if(response && response['response']){
          delete response['response'][0].password;
          localStorage.setItem('adminData', JSON.stringify(response['response'][0]))
          this.commonService.toggleSnackBar('Profile Updated Successfully');
        }
        else
          this.commonService.toggleSnackBar();
      }, error => {
        console.log('error ', error);
        this.commonService.toggleSnackBar();
      } )
  }

  filee(file){
    console.log('file ', file, file.target.files[0]);
    this.adminData.thumbnail = file.target.files[0];
  }

  ngOnInit() {
    if(localStorage.getItem('adminData')) {
      this.adminData = JSON.parse(localStorage.getItem('adminData'));
      this.initProfileform();
    } else{
      this.commonService.toggleSnackBar();
    }
  }

  initProfileform() {
    this.profileForm = this.fb.group({
      'name': [this.adminData.name, Validators.required],
      'access_token': [this.adminData.access_token, Validators.required],
      'created_on': [this.adminData.created_on, Validators.required],
      'address': [this.adminData.address, Validators.required],
      'email': [this.adminData.email, Validators.required],
      'mobile_number': [this.adminData.mobile_number, Validators.required],
      'timeStamp': [this.adminData.timeStamp, Validators.required],
      '_id': [this.adminData._id, Validators.required],
    });
  }

  onEditProfile() {
    
    if (this.adminData.thumbnail) {
      
      // const uploadData = new FormData();
      // uploadData.append('myFile', this.adminData.thumbnail, this.adminData.thumbnail.name);
      this.profileForm.value.profile_image = this.adminData.thumbnail;

    }
    console.log(' this.profileForm => ', this.profileForm.value);

    this.http
      .put(`/admin/${this.adminData._id}/edit`, this.profileForm.value)
      .subscribe((adminData) => {
        this.adminData = adminData['response'];
        localStorage.setItem('adminData', JSON.stringify(this.adminData));
        this.commonService.toggleSnackBar('Profile updated successfully');
      }, err => {
        console.log(' Error => ', err);
        this.commonService.toggleSnackBar('Error in updating profile.');
      })
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.onUpload(file);
  }

  onUpload(file) {
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    uploadData.append('admin_id', this.adminData._id);

    this.http.post('/admin/upload_image', uploadData)
      .subscribe(event => {
        if(event['error']) {
          this.commonService.toggleSnackBar('Error in uploading profile.');
        } else {
          this.adminData.profile_image =  event['file_path'];
          localStorage.setItem('adminData', JSON.stringify(this.adminData));
          this.commonService.toggleSnackBar('Uploading successfully.');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in uploading profile.');
      });
  }

}

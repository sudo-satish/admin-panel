import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-provider-profile',
  templateUrl: './seller-provider-profile.component.html',
  styleUrls: ['./seller-provider-profile.component.scss']
})
export class SellerProviderProfileComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  userId;
  userData;
  
  errMessage = '';
  environment = environment;

  ngOnInit() {
    this.userId = '';
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.setUserData(this.userId);
    })
  }

  setUserData(userId) {
    this.http.get('/admin/get_seller_provider_profile?seller_provider_id='+userId).subscribe(resp => {
      if (resp['response']) {
        this.userData = resp['response'];
        console.log(' this.userData', this.userData);
        
      }
    }, error => {
      console.log(' Error => ' ,error);
    })
  }

  getAddress() {
    if (this.userData && this.userData.region_name) {
      return `${this.userData.region_name}, ${this.userData.city_name}`;
    } else {
      return '';
    }
  }
}

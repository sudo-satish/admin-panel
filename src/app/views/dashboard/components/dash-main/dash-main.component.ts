import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewRef } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';

import { Chart } from 'chart.js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.scss']
})
export class DashMainComponent implements OnInit, AfterViewInit {
  totalData: any;
  adminData: any;
  environment = environment;
  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }

  dataCount;

  ngOnInit() {
    
    // this.http.get('/admin/get_dashboard_data')
    // .subscribe(response => {
    //   console.log(response);
    //   if(response) {
    //     this.adminData = response;
    //     this.manageCharts();
    //   } else {
    //     this.commonService.toggleSnackBar();
    //   }
    // }, error =>  {
    //   console.log(' Error => ', error);
    //   this.commonService.toggleSnackBar()
    // })
  }

  ngAfterViewInit() {
    // this.manageCharts()
  }

  manageCharts() {

    let userChart = this.initChart(this.adminData.usersMonthCount, 'Users', 'userChart' );
    let sellerChart = this.initChart(this.adminData.sellersMonthCount, 'Sellers', 'sellerChart' );
    let providerChart = this.initChart(this.adminData.providersMonthCount, 'Providers', 'providerChart' );
    
  }

  initChart(usersData, label, chartSelector) {
    var ctx = document.getElementById(chartSelector);
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: usersData.month_arr,
        datasets: [{
          label: `# of ${label}`,
          data: usersData.count_arr,
        }]
      }
    })
    return chart;
  }

}

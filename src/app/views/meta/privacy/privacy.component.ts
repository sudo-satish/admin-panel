import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

    environment = environment;
    title = `Privacy`;
    height = '50em';
    htmlContent = `
    <h1>Edit Here</h1> 
  `;
    
    resource = `/admin/api/application?type=PRIVACY`;

    constructor(
        public http: HttpClient,
        private notificationService: CommonService
    ) { }

    ngOnInit() {

        let url = this.resource;
        let headers = new HttpHeaders({
            'Accept': 'text/html',
            'XFF': 'testing123'
        });

        
        this.http.get(url, { responseType: 'text'})
            .subscribe((response: any) => {
                this.htmlContent = response;
            }, error => {
                console.log(error);
                
                this.notificationService.toggleSnackBar('Something went wrong');
            })
    }

    save() {
        let url = `/admin/api/application?type=PRIVACY`;
        this.http.put(url, { data: this.htmlContent }, { responseType: 'text' })
            .subscribe((response: any) => {
                // console.log('response ', response.response);
                // this.htmlContent = response.data;
                this.notificationService.toggleSnackBar('Updated successfully');
            }, error => {
                this.notificationService.toggleSnackBar('Something went wrong');
            })
    }

    preview() {
        console.log(this.htmlContent);
    }

}

import { OnInit, Component, ViewChild } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm, FormControl } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { pull, remove } from "lodash";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from "lodash";

@Component({
    selector: 'app-club',
    templateUrl: './club.component.html',
    styleUrls: ['./club.component.scss']
})
export class ClubComponent extends UpComponent {
    
    displayedColumns: string[] = ['admin', 'clubName', 'maxSize', 'description', 'location', 'action'];
    resource = 'club';
    activitys: any[];

    selectedElement = { spot: [], clubName: '', clubImage: '', description: '', email: '', maxSize: '', user: { avatar: '', firstName: '', countryCode: '', phoneNumber: ''}, lattitude: '', longitude: '', primaryActivity: '', secondaryActivity: '', otherActivity: '', createdAt: ''}; // To view detail.
    selectedElementBKP = { spot : []}; // To view detail.
    
    // var timmer = ;
    compareWithActivity = (o1, o2) => o1._id == o2._id;
    getSpotHtml = (element) => element.spot.map(i => i.spotName).join(', ');

    constructor(
        public http: HttpClient,
        public router: Router,
        public route: ActivatedRoute
    ) {
        super(http);
    }

    ngOnInit() {
        super.ngOnInit();
        this.setActivitys();
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    setPaginator(dataSource: MatTableDataSource<any>): MatTableDataSource<any> {
        dataSource.paginator = this.paginator;
        return dataSource;
    }

    viewDetail(element) {
        this.selectedElement = element;
    }

    setActivitys() {
        let url = '/admin/api/activity';

        this.http.get(url).subscribe(
            (activitys: any[]) => {
                this.activitys = activitys;
            },this.defaultErrorHandler.bind(this)
        )
    }

    getUpdateValue(form: NgForm) {
        console.log(form.value);
        return this.getFormData(form, 'clubImage');
    }

    getFormData(form: NgForm, fileField?): FormData {
        let formData = new FormData();
        let formValue = form.value;
        
        
        formValue.otherActivity = formValue.otherActivity.map(i => i._id );
        formValue.primaryActivity = formValue.primaryActivity.map(i => i._id );
        formValue.secondaryActivity = formValue.secondaryActivity.map(i => i._id );

        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const value = formValue[key];
                if (value) {
                    formData.append(key, value);
                }
            }
        }

        if (this.file) {
            formData.append(fileField ? fileField : 'spot', this.file);
        }

        return formData;
    }
    
}
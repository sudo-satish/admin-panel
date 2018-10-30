import { OnInit, Component, ViewChild } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import * as _ from "lodash";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends UpComponent {
    
    displayedColumns: string[] = ['avatar', 'firstName', 'lastName', 'countryCode', 'phoneNumber', 'email', 'gender', 'action'];
    resource = 'user';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    constructor(
        public http: HttpClient
    ) {
        super(http);
    }

    setPaginator(dataSource: MatTableDataSource<any>): MatTableDataSource<any> {
        dataSource.paginator = this.paginator;
        return dataSource;
    }

    onDelete(element) {
        //{{url}}/admin/api/user/5bac956e8581ac245e4c7d0e
        let url = `/admin/api/user/${element._id}`;
        let confirm = window.confirm('Confirm to delete!');
        if (!confirm) {
            return false;
        }
        this.http.delete(url).subscribe(
            respo => {
                alert('Deleted successfully');
                this.fetchData();
            },
            this.defaultErrorHandler.bind(this)
        )
    }

    getUpdateValue(form) {
        return this.getFormData(form, 'ProfileImage');
    }

    activityArr = [];
    viewActivityDetail(user) {
        this.getActivityDetail(user._id).subscribe(
            (detail: any[]) => {
                console.log(detail);
                this.activityArr = detail;
            },
            this.defaultErrorHandler.bind(this)
        );
    }

    getActivityDetail(_id) {
        let url = `/admin/api/${this.resource}/${_id}/activity`;
        return this.http.get(url);
    }

    getTaskTitle(element, tasktypeId) {

        var tasktypeArr = element.activityId.tasktype;
        var taskType = tasktypeArr.filter((i) => i._id == tasktypeId.tasktypeId);
        var tsk = '--';
        if (taskType[0]) {
            tsk = taskType[0].tasktype ? taskType[0].tasktype : '--';
        }
        return tsk;
    }
    
    getClubDetail(_id) {
        let url = `/admin/api/${this.resource}/${_id}/club`;
        return this.http.get(url);
    }

    clubArr = [];
    viewClubDetail(user) {
        this.getClubDetail(user._id).subscribe(
            (detail: any[]) => {
                console.log(detail);
                this.clubArr = detail;
            },
            this.defaultErrorHandler.bind(this)
        );
    }
}
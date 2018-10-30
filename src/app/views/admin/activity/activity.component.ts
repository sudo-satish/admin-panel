import { OnInit, Component, ViewChild } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm, FormControl } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { pull, remove } from "lodash";
import { Router } from "@angular/router";
import * as _ from "lodash";

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends UpComponent {
    
    displayedColumns: string[] = ['activityName', 'subActivity', 'activityImage', 'action'];
    resource = 'activity';

    selectedElement = { tasktype: [], activityName: '', activityImage: '', activityQuestion: '', spotQuestion: '', taskTypeQuestion: ''}; // To view detail.
    selectedElementBKP = { tasktype: [], activityName: '', activityImage: '', activityQuestion: '', spotQuestion: '', taskTypeQuestion: ''}; // To view detail.
    selectedElementHtml = '<h3>Nothing found!</h3>';

    
    constructor(
        public http: HttpClient,
        public router: Router
    ) {
        super(http);
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    setPaginator(dataSource: MatTableDataSource<any>): MatTableDataSource<any> {
        dataSource.paginator = this.paginator;
        return dataSource;
    }

    getUpdateValue(form: NgForm) {
        return this.getFormData(form);
    }

    getSaveValue(form: NgForm) {
        return this.getFormData(form);
    }

    getFormData(form: NgForm): FormData {
        let formData = new FormData();
        let formValue = form.value;

        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const value = formValue[key];
                if (value) {
                    formData.append(key, value);
                }
            }
        }

        if (this.selectedElement.tasktype && this.selectedElement.tasktype.length > 0) {
            formData.append('tasktype', JSON.stringify(this.selectedElement.tasktype));
        }

        if (this.file) {
            formData.append('activityImage', this.file);
        }

        return formData;
    }

    viewDetail(element) {
        this.selectedElement = element;

        this.makeHtml(element);
    }

    makeHtml(element) {
        var html = ``;
        html += `<img src='${element.activityImage}' height='45px' width='45px' />`;

    }

    onEdit(element, form: NgForm) {
        this.selectedElement = element;
        super.onEdit(element, form);
    }

    onNew(element, form: NgForm) {
        this.selectedElement = _.clone(this.selectedElementBKP);
        super.onNew(element, form);
    }

    addTaskType(taskType) {
        if(taskType['value'] !== '') {
            this.selectedElement.tasktype.unshift({ tasktype: taskType.value });
            taskType['value'] = '';
        }
    }

    deleteTaskType(tasktype, index) {
        this.selectedElement.tasktype.splice(index, 1);
    }

    viewSubactivity(element) {
        this.router.navigate(['admin', 'activity', element._id, 'subactivity'])
    }
}
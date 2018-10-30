import { OnInit, Component, ViewChild } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent extends UpComponent {
    
    displayedColumns: string[] = ['name', 'description', 'image', 'link', 'action'];
    resource = 'event';

    constructor(
        public http: HttpClient
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

        if (this.file) {
            formData.append('eventImage', this.file);
        }

        return formData;
    }

    validateBeforeSave(form) {
        let value = form.value;
        if (!this.file || this.file == null) {
            alert('Please upload an image!');
            return false;
        }

        if (!parseFloat(value.lattitude)) {
            alert('Please enter valid lattitude.');
            return false;
        }
        
        if (!parseFloat(value.longitude)) {
            alert('Please enter valid longitude.');
            return false;
        }

        return true;
    }
    
    validateBeforeUpdate(form) {
        let value = form.value;

        if (!parseFloat(value.lattitude)) {
            alert('Please enter valid lattitude.');
            return false;
        }
        
        if (!parseFloat(value.longitude)) {
            alert('Please enter valid longitude.');
            return false;
        }

        return true;
    }
}
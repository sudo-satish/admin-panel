import { OnInit, Component } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";

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
}
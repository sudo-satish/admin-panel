import { OnInit, Component } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";

@Component({
    selector: 'app-spot',
    templateUrl: './spot.component.html',
    styleUrls: ['./spot.component.scss']
})
export class SpotComponent extends UpComponent {
    
    displayedColumns: string[] = ['spotName', 'description', 'spotImage', 'action'];
    resource = 'spot';

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
}
import { Component, Input } from "@angular/core";
import { environment } from "../../../../environments/environment";
import startCase from "lodash";

@Component({
    selector: 'app-activity-detail',
    templateUrl: './activity-detail.component.html',
    styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent {
    
    @Input('activity') selectedElement;
    baseUrl = environment.baseUrl;
    constructor() {
    }

    startCase = startCase;
}

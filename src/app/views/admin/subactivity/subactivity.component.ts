import { OnInit, Component } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm, FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { pull, remove } from "lodash";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from "lodash";

@Component({
    selector: 'app-subactivity',
    templateUrl: './subactivity.component.html',
    styleUrls: ['./subactivity.component.scss']
})
export class SubactivityComponent extends UpComponent {
    
    displayedColumns: string[] = ['subActivityName', 'spot', 'activityImage', 'action'];
    resource = 'subactivity';

    spots: any[] = [];
    activityId;
    selectedElement = { spot : []}; // To view detail.
    selectedElementBKP = { spot : []}; // To view detail.

    selectedElementHtml = '<h3>Nothing found!</h3>';
    
    compareWith = (o1, o2) => o1._id == o2._id;
    getSpotHtml = (element) => element.spot.map(i => i.spotName).join(', ');

    constructor(
        public http: HttpClient,
        public router: Router,
        public route: ActivatedRoute
    ) {
        super(http);
    }

    ngOnInit() {
        
        this.route.params.subscribe(
            params => {
                this.activityId = params.activityId;
                super.ngOnInit();
            },
            this.defaultErrorHandler.bind(this)
        )

        this.getAllSpots();
    }

    fetchDataUrl() {
        return '/admin/api/activity/' + this.activityId +'/subactivity' ;
    }

    getUpdateValue(form: NgForm) {
        let value = form.value;
        value.activity = this.activityId;
        value.spot = value.spot.map(i => i._id);
        return value;
    }

    getSaveValue(form: NgForm) {
        let value = form.value;
        value.activity = this.activityId;
        value.spot = value.spot.map(i => i._id );
        delete value._id;
        return value;
    }

    viewDetail(element) {
        this.selectedElement = element;
    }

    onEdit(element, form: NgForm) {
        this.selectedElement = element;
        super.onEdit(element, form);
    }

    onNew(element, form: NgForm) {
        this.selectedElement = _.clone(this.selectedElementBKP);
        super.onNew(element, form);
    }

    addSpot(taskType) {
        this.selectedElement.spot.unshift({ spot: taskType.value });
        taskType['value'] = '';
    }

    deleteTaskType(tasktype, index) {
        this.selectedElement.spot.splice(index, 1);
    }

    viewSubactivity(element) {
        this.router.navigate(['admin', 'activity', element._id, 'subactivity'])
    }

    getAllSpots() {
        let url = `/admin/api/spot`;
        this.http.get(url).subscribe(
            (spots: any[]) => {
                this.spots = spots;
            }, this.defaultErrorHandler.bind(this)
        )
    }

    
}
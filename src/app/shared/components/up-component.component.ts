import { MatTableDataSource } from "@angular/material";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import * as _ from "lodash";

export abstract class UpComponent {
    
    //  === Abstract Properties ===
    abstract displayedColumns: string[] = ['spotName', 'description', 'spotImage', 'action'];
    dataSource: MatTableDataSource<any>;
    abstract resource = 'spot';
    baseUrl = environment.baseUrl;
    errMessage;

    file;

    constructor(
        public http: HttpClient
    ) {
    }

    ngOnInit() {
        this.fetchData();
    }

    fileEv($event) {
        this.file = $event.target.files[0];
    }

    fetchData() {
        let url = this.fetchDataUrl();
        this.http.get(url).subscribe(
            response => {
                this.setAllData(response);
            },
            this.defaultErrorHandler.bind(this)
        )
    }

    fetchDataUrl() {
        return '/admin/api/' + this.resource;
    }

    defaultErrorHandler(error) {
        if (error['error']['error']) {
            alert(error['error']['error']);
        }
    }

    setAllData(response) {
        this.dataSource = new MatTableDataSource(response);
        this.setPaginator(this.dataSource);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }

    setPaginator(dataSource: MatTableDataSource<any>): MatTableDataSource<any> {
        return dataSource;
    }

    onEdit(element, form: NgForm) {

        this.file = null;

        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const value = element[key];
                if (form.controls[key]) {
                    form.controls[key].setValue(value);
                }
            }
        }
    }

    onNew(element, form: NgForm) {
        this.file = null;
        form.reset();
    }

    onDelete(element) {
        let url = this.getDeleteUrl(element);

        this.http.delete(url).subscribe(
            response => {
                this.afterDelete(element);
            },
            this.defaultErrorHandler.bind(this)
        )
    }

    formSubmitted(form: NgForm) {

        let value = form.value;

        if (value._id) {
            this.updateValue(form);
        } else {
            this.saveValue(form);
        }
    }

    updateValue(form) {
        let url = this.getUpdateUrl();
        let _id = form.value._id;

        let value = this.getUpdateValue(form);

        url += `/${_id}`;

        this.http.put(url, value).subscribe(
            response => {
                this.afterUpdate(form, value, response);
            },
            this.defaultErrorHandler.bind(this)
        )
    }

    saveValue(form) {
        let url = this.getSaveUlr();
        let value = this.getSaveValue(form);
        this.http.post(url, value).subscribe(
            response => {
                this.afterSave(form, response);
            },
            this.defaultErrorHandler.bind(this)
        )
    }

    getUpdateValue(form: NgForm) {
        return form.value;
    }

    getSaveValue(form: NgForm) {
        return form.value;
    }

    afterSave(form: NgForm, response) {
        // console.log(this.dataSource.data.push(response));
        this.dataSource.data.push(response);
        let data = this.dataSource.data;
        this.dataSource = new MatTableDataSource(data);
        this.setPaginator(this.dataSource);
        alert('Saved successfully');
    }

    afterUpdate(form: NgForm, value, response) {
        alert('Updated successfully');
        this.fetchData();
    }

    afterDelete(element) {
        let data = this.dataSource.data;
        data = data.filter(i => {
            return i._id !== element._id;
        })

        this.dataSource = new MatTableDataSource(data);
        this.setPaginator(this.dataSource);
        alert('deleted successfully');
    }

    getUpdateUrl() {
        return `/admin/api/` + this.resource;
    }

    getSaveUlr() {
        return `/admin/api/` + this.resource;
    }

    getDeleteUrl(element) {
        return `/admin/api/` + this.resource + '/' + element._id;
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
            formData.append('spot', this.file);
        }

        return formData;
    }

    startCase(s) {
        return _.startCase(s);
    }
    
}
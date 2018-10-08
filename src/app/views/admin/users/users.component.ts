import { OnInit, Component, ViewChild } from "@angular/core";
import { UpComponent } from "../../../shared/components/up-component.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { NgForm } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from "@angular/material";

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
        this.http.delete(url).subscribe(
            respo => {
                alert('Deleted successfully');
                this.fetchData();
            },
            this.defaultErrorHandler.bind(this)
        )
    }
}
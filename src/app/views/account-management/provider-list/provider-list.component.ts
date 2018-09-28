import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as queryString from 'query-string';


@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router) { }

  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['name', 'phone', 'email', 'action-view-profile', 'action-block', 'action-unblock'];
  dataSource;

  ngOnInit() {
    this.query = '';
    this.setDataSource();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setDataSource(filter?: any) {
    let filters = filter ? '?' + filter : '';
    let url = '/admin/get_providers_list' + filters;

    this.http.get(url)
      .subscribe((response) => {
        this.dataSource = response['response'].providers_list;
        this.length = response['response'].total_count;
      }, err => {
        console.log(err);
      })
  }

  block(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');

    this.http.put('/admin/block_provider', { _id }).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  unblock(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    this.http.put('/admin/unblock_provider', { _id }).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

  viewProfile(sellerId) {
    this.router.navigate(['/acc-mgm/seller-provider-profile', sellerId]);
  }

}

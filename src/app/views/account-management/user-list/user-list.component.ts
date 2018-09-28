import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as queryString from 'query-string';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  
  displayedColumns: string[] = ['name', 'phone', 'email', 'action-view', 'action-block', 'action-unblock'];
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
    let url = '/admin/get_users_list' + filters;

    this.http.get(url)
      .subscribe((response) => {
        this.dataSource = response['response'].users_list;
        this.length = response['response'].total_count;
      }, err => {
        console.log(err);
      })
  }

  block(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');

    console.log(event.target);
    console.log('_id => ', _id);

    this.http.put('/admin/block_user', { _id }).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  unblock(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    this.http.put('/admin/unblock_user', { _id }).subscribe(() => {
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
    this.router.navigate(['/acc-mgm/user-profile', sellerId]);
  }

}

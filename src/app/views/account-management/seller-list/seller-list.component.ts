import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ) { }
  
  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  displayedColumns: string[] = ['name', 'phone', 'email', 'action-view-product','action-view-profile', 'action-block', 'action-unblock'];
  dataSource;

  ngOnInit() {
    this.query = '';
    this.setDataSource();
  }

  setDataSource(filter?: any) {
    let filters = filter ? '?'+filter : '';
    let url = '/admin/get_sellers_list'+ filters;
    
    this.http.get(url)
      .subscribe((response) => {
        this.dataSource = response['response'].sellers_list;
        this.length = response['response'].total_count;
      }, err => {
        console.log(err);
      })
  }

  block(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    
    console.log(event.target);
    console.log('_id => ', _id);

    this.http.put('/admin/block_seller', {_id}).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  unblock(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    this.http.put('/admin/unblock_seller', { _id }).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

  viewProducts(sellerId) {
    this.router.navigate(['/acc-mgm/product-list', sellerId]);
  }
  
  viewProfile(sellerId) {
    this.router.navigate(['/acc-mgm/seller-provider-profile', sellerId]);
  }
}
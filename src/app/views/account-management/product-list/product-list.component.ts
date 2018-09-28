import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog) { }
  
  dataSource;
  sellerId;
  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['product_title', 'images', 'main_category_name', 'category_name', 'sub_category_name', 'action-block', 'action-unblock'];
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit() {
    this.query = '';

    this.route.params.subscribe(params => {
      this.sellerId = params.sellerId;
      this.setDataSource(this.sellerId);
    })
  }

  setDataSource(sellerId, filter?) {
    
    let filters = filter ? filter : '';
    let url = '/admin/get_product_list?sellerId=' + sellerId + filters;

    this.http.get(url)
      .subscribe((response) => {
        this.dataSource = response['response'].product_list;
        this.length = response['response'].total_count;
      }, err => {
        console.log(err);
      })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.sellerId, this.query);
  }


  verify(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');

    this.http.put('/admin/verify_product', { _id }).subscribe(() => {
      this.setDataSource(this.sellerId, this.query);
    }, err => {
      console.log(err);
    })
  }

  refute(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    this.http.put('/admin/refute_product', { _id }).subscribe(() => {
      this.setDataSource(this.sellerId, this.query);
    }, err => {
      console.log(err);
    })
  }

  getSubCategoryName(elementList) {
    //sub_category_name
    let subCategoryName = '';
    elementList.sub_category.forEach(element => {
      subCategoryName += element.sub_category_name+', ';
    });
    return subCategoryName;
  }

  showAllImages(element): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50em',
      data: {imageArr: element.product_image_array}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: ' <div><img style="height: 9.0em; width: 9.0em; margin-left: 1.5em;" *ngFor="let image of data.imageArr " class="product-thumbnail" [src]="image.product_image" alt=""></div>',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {

      console.log('this => ', this.data);
      
     }

  onNoClick(): void {

    console.log(this.data);
    
    this.dialogRef.close();
  }

}

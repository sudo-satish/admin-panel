import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public snackBar: MatSnackBar
  ) { }

  ngSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.commonService.snackbar$
      .subscribe ( response => {
        console.log('snackbar ', response);
        // this.toggleSnackbar(response);
        this.ngSnackBar(response)
      });
  }

}

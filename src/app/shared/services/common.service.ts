import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(
    private http: HttpClient
  ) { }
  snackbar = new Subject<any>();

  snackbar$ = this.snackbar.asObservable();

  toggleSnackBar(message = 'Something Went Wrong'){
    this.snackbar.next(message);
  }

}

import { NgModule } from '@angular/core';

import {MatTableModule, 
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTreeModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  exports: [
    MatTableModule,
    MatTreeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    CdkTableModule
  ]
})
export class MatModuleModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashMainComponent } from './components/dash-main/dash-main.component';

const routes: Routes = [
  {
    path: '',
    component: DashMainComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

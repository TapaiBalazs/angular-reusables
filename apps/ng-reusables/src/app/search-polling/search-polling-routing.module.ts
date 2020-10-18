import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPollingComponent} from './search-polling/search-polling.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPollingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPollingRoutingModule { }

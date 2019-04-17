import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoadingMessagePageComponent} from './loading-message-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingMessagePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingMessagePageRoutingModule { }

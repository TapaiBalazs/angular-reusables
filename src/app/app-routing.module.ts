import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'loading-indicator',
    loadChildren: './loading-indicator-page/loading-indicator-page.module#LoadingIndicatorPageModule'
  },
  {
    path: 'loading-ellipsis',
    loadChildren: './loading-ellipsis-page/loading-ellipsis-page.module#LoadingEllipsisPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

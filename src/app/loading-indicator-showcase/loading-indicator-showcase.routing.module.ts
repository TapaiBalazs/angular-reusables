import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadingIndicatorShowcaseComponent} from './loading-indicator-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingIndicatorShowcaseComponent,
    children: [
      {
        path: 'spinner',
        loadChildren: './loading-indicator-page/loading-indicator-page.module#LoadingIndicatorPageModule'
      },
      {
        path: 'ellipsis',
        loadChildren: './loading-ellipsis-page/loading-ellipsis-page.module#LoadingEllipsisPageModule'
      },
      {
        path: 'message',
        loadChildren: './loading-message-page/loading-message-page.module#LoadingMessagePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingIndicatorShowcaseRoutingModule {
}

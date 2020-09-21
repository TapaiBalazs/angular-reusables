import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingIndicatorShowcaseComponent } from './loading-indicator-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingIndicatorShowcaseComponent,
    children: [
      {
        path: 'spinner',
        loadChildren: () => import('./loading-indicator-page/loading-indicator-page.module').then((m) => m.LoadingIndicatorPageModule),
      },
      {
        path: 'ellipsis',
        loadChildren: () => import('./loading-ellipsis-page/loading-ellipsis-page.module').then((m) => m.LoadingEllipsisPageModule),
      },
      {
        path: 'message',
        loadChildren: () => import('./loading-message-page/loading-message-page.module').then((m) => m.LoadingMessagePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingIndicatorShowcaseRoutingModule {}

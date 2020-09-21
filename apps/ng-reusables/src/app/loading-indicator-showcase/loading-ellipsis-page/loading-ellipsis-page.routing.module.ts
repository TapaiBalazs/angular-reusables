import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingEllipsisPageComponent } from './loading-ellipsis-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingEllipsisPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingEllipsisPageRoutingModule {}

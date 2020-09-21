import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingIndicatorPageComponent } from './loading-indicator-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingIndicatorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingIndicatorPageRoutingModule {}

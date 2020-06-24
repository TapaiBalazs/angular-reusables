import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageTricksShowcaseComponent} from './image-tricks-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: ImageTricksShowcaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageTricksShowcaseRoutingModule {
}

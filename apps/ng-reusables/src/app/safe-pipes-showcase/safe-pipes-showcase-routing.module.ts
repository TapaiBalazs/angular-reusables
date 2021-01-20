import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SafePipesDisplayComponent} from './components/safe-pipes-display/safe-pipes-display.component';


const routes: Routes = [
  {
    path: '',
    component: SafePipesDisplayComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafePipesShowcaseRoutingModule {
}

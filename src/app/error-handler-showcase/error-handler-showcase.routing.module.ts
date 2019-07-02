import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorHandlerShowcaseComponent} from './error-handler-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorHandlerShowcaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorHandlerShowcaseRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorisationShowcaseComponent} from './authorisation-showcase/authorisation-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisationShowcaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorisationDirectiveShowcaseRoutingModule {
}

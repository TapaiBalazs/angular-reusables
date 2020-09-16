import {NgModule} from '@angular/core';
import {AuthorisationDirectiveShowcaseRoutingModule} from './authorisation-directive-showcase.routing.module';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';


@NgModule({
  declarations: [AuthorisationShowcaseComponent],
  imports: [
    AuthorisationDirectiveShowcaseRoutingModule
  ]
})
export class AuthorisationDirectiveShowcaseModule {
}

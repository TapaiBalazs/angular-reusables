import { NgModule } from '@angular/core';
import { AuthorisationModule } from '@nx-reusables/authorisation';
import { AuthorisationDirectiveShowcaseRoutingModule } from './authorisation-directive-showcase.routing.module';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';
import { ReadRightOnlyComponent } from './read-right-only/read-right-only.component';

@NgModule({
  declarations: [AuthorisationShowcaseComponent, ReadRightOnlyComponent],
  imports: [AuthorisationModule, AuthorisationDirectiveShowcaseRoutingModule]
})
export class AuthorisationDirectiveShowcaseModule {
}

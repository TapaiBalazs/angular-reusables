import { NgModule } from '@angular/core';
import { AuthorisationModule } from '@nx-reusables/authorisation';
import { AuthorisationDirectiveShowcaseRoutingModule } from './authorisation-directive-showcase.routing.module';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';
import { ReadRightOnlyComponent } from './read-right-only/read-right-only.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadWriteRightComponent } from './read-right-only/read-write-right.component';
import { NoRightsComponent } from './read-right-only/no-rights.component';

@NgModule({
  declarations: [AuthorisationShowcaseComponent, ReadRightOnlyComponent, ReadWriteRightComponent, NoRightsComponent],
  imports: [AuthorisationModule, AuthorisationDirectiveShowcaseRoutingModule, ReactiveFormsModule],
})
export class AuthorisationDirectiveShowcaseModule {}

import { NgModule } from '@angular/core';
import { AuthorisationDirective } from './authorisation.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthorisationDirective],
  imports: [CommonModule],
  exports: [AuthorisationDirective],
})
export class AuthorisationModule {}

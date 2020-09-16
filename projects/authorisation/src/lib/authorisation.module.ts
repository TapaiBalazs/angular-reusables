import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthorisationDirective} from './authorisation.directive';


@NgModule({
  declarations: [AuthorisationDirective],
  imports: [],
  exports: [AuthorisationDirective]
})
export class AuthorisationModule {

  static forRoot(): ModuleWithProviders<AuthorisationModule> {
    return {
      ngModule: AuthorisationModule,
      providers: []
    };
  }
}

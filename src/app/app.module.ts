import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ERROR_HANDLER_CONFIG, ErrorHandlerConfig, ErrorHandlerModule} from '@btapai/ng-error-handler';
import {ErrorLogger} from './helpers/error-logger';
import {HttpClientModule} from '@angular/common/http';
import {AUTHORISATION_CLASS, AUTHORISATION_HANDLER, AuthorisationModule} from '@btapai/ng-authorisation';
import {AuthorisationImplService} from './main/authorisation-impl.service';

const CustomErrorHandlerConfig: ErrorHandlerConfig = {
  errorHandlerHooks: [
    ErrorLogger.logErrorMessage,
    console.error,
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ErrorHandlerModule.forRoot(),
    AuthorisationModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: 'ROLES', useValue: ['BIG_RED_BUTTON_READ', 'BIG_RED_BUTTON_WRITE'] },
    {provide: ERROR_HANDLER_CONFIG, useValue: CustomErrorHandlerConfig},
    {provide: AUTHORISATION_HANDLER, useClass: AuthorisationImplService},
    {provide: AUTHORISATION_CLASS, useValue: 'app-unauthorised'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

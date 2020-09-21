import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTHORISATION_CLASS, AUTHORISATION_HANDLER, AuthorisationModule } from '@nx-reusables/authorisation';
import { ERROR_HANDLER_CONFIG, ErrorHandlerConfig, ErrorHandlerModule } from '@nx-reusables/error-handler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorLogger } from './helpers/error-logger';
import { AuthorisationImplService } from './main/authorisation-impl.service';
import { MainComponent } from './main/main.component';

const CustomErrorHandlerConfig: ErrorHandlerConfig = {
  errorHandlerHooks: [ErrorLogger.logErrorMessage, console.error],
};

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, HttpClientModule, ErrorHandlerModule.forRoot(), AuthorisationModule, AppRoutingModule],
  providers: [
    {
      provide: 'ROLES',
      useValue: ['BIG_RED_BUTTON_READ', 'BIG_RED_BUTTON_WRITE'],
    },
    { provide: ERROR_HANDLER_CONFIG, useValue: CustomErrorHandlerConfig },
    { provide: AUTHORISATION_HANDLER, useClass: AuthorisationImplService },
    { provide: AUTHORISATION_CLASS, useValue: 'app-unauthorised' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

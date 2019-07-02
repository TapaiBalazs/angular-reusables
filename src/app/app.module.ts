import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ERROR_HANDLER_CONFIG, ErrorHandlerConfig, ErrorHandlerModule} from '@btapai/ng-error-handler';
import {ErrorLogger} from './helpers/error-logger';
import {HttpClientModule} from '@angular/common/http';

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
    AppRoutingModule,
  ],
  providers: [
    {provide: ERROR_HANDLER_CONFIG, useValue: CustomErrorHandlerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

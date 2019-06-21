import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ErrorHandlerModule, ErrorHandlerService} from '@btapai/ng-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ErrorHandlerModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    [
      // {
      //   provide: ErrorHandler,
      //   useFactory: () =>ErrorHandlerService
      // }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

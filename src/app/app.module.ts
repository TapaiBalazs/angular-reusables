import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoadingIndicatorModule, LOADING_INDICATOR_CONFIG} from '@btapai/ng-loading-indicator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingIndicatorModule.forRoot()
  ],
  providers: [{provide: LOADING_INDICATOR_CONFIG, useValue: { color: 'red', size: 80}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

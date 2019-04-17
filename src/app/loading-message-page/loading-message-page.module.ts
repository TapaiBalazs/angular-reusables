import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingMessagePageComponent} from './loading-message-page.component';
import {LOADING_INDICATOR_CONFIG, LoadingIndicatorModule} from 'loading-indicator';
import {LoadingMessagePageRoutingModule} from './loading-message-page.routing.module';
import {FormsModule} from '@angular/forms';
import {EllipsisComponent} from '@btapai/ng-loading-indicator';
import {LoadingMessageComponent} from './loading-message.component';

@NgModule({
  declarations: [LoadingMessagePageComponent, LoadingMessageComponent],
  imports: [
    CommonModule,
    LoadingMessagePageRoutingModule,
    LoadingIndicatorModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {provide: LOADING_INDICATOR_CONFIG, useValue: {color: 'red', size: 160, indicatorComponent: LoadingMessageComponent}}
  ],
  entryComponents: [LoadingMessageComponent]
})
export class LoadingMessagePageModule {
}
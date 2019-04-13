import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorPageComponent } from './loading-indicator-page.component';
import { LoadingIndicatorModule, LOADING_INDICATOR_CONFIG} from '@btapai/ng-loading-indicator';
import {LoadingIndicatorPageRoutingModule} from './loading-indicator-page.routing.module';

@NgModule({
  declarations: [LoadingIndicatorPageComponent],
  imports: [
    CommonModule,
    LoadingIndicatorPageRoutingModule,
    LoadingIndicatorModule.forRoot()
  ],
  providers: [{provide: LOADING_INDICATOR_CONFIG, useValue: { color: 'red', size: 80}}]
})
export class LoadingIndicatorPageModule { }

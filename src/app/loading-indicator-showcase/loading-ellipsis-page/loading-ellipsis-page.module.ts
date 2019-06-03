import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingEllipsisPageComponent} from './loading-ellipsis-page.component';
import {LOADING_INDICATOR_CONFIG, LoadingIndicatorModule} from '@btapai/ng-loading-indicator';
import {LoadingEllipsisPageRoutingModule} from './loading-ellipsis-page.routing.module';
import {FormsModule} from '@angular/forms';
import {EllipsisComponent} from '@btapai/ng-loading-indicator';

@NgModule({
  declarations: [LoadingEllipsisPageComponent],
  imports: [
    CommonModule,
    LoadingEllipsisPageRoutingModule,
    LoadingIndicatorModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {provide: LOADING_INDICATOR_CONFIG, useValue: {size: 160, indicatorComponent: EllipsisComponent}}
  ]
})
export class LoadingEllipsisPageModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorPageComponent } from './loading-indicator-page.component';
import { LoadingIndicatorModule, LOADING_INDICATOR_CONFIG} from 'loading-indicator';
import {LoadingIndicatorPageRoutingModule} from './loading-indicator-page.routing.module';
import {FormsModule} from '@angular/forms';
import {ProgressIndicatorModule} from '../../../../projects/progress-indicator/src/lib/progress-indicator.module';

@NgModule({
  declarations: [LoadingIndicatorPageComponent],
  imports: [
    CommonModule,
    LoadingIndicatorPageRoutingModule,
    LoadingIndicatorModule.forRoot(),
    FormsModule,
    ProgressIndicatorModule
  ],
  providers: [{provide: LOADING_INDICATOR_CONFIG, useValue: { color: 'red', size: 80}}]
})
export class LoadingIndicatorPageModule { }

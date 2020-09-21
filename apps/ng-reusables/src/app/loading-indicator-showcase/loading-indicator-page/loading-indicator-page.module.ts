import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOADING_INDICATOR_CONFIG, LoadingIndicatorModule } from '@nx-reusables/loading-indicator';
import { LoadingIndicatorPageComponent } from './loading-indicator-page.component';
import { LoadingIndicatorPageRoutingModule } from './loading-indicator-page.routing.module';

@NgModule({
  declarations: [LoadingIndicatorPageComponent],
  imports: [CommonModule, LoadingIndicatorPageRoutingModule, LoadingIndicatorModule.forRoot(), FormsModule],
  providers: [{ provide: LOADING_INDICATOR_CONFIG, useValue: { color: 'red', size: 80 } }],
})
export class LoadingIndicatorPageModule {}

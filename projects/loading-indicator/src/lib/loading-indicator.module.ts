import {NgModule} from '@angular/core';
import {LoadingIndicatorComponent} from './loading-indicator.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingIndicatorComponent]
})
export class LoadingIndicatorModule {
}

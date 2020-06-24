import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {IndicatorHostDirective} from './directives/indicator-host.directive';
import {SpinnerComponent} from './spinner/spinner.component';
import {DEFAULT_CONFIG, LOADING_INDICATOR_CONFIG} from './loading-indicator.config';
import {OverlayComponent} from './overlay/overlay.component';
import {EllipsisComponent} from './ellipsis/ellipsis.component';

@NgModule({
  declarations: [
    EllipsisComponent,
    IndicatorHostDirective,
    LoadingIndicatorComponent,
    OverlayComponent,
    SpinnerComponent
  ],
  entryComponents: [
    SpinnerComponent,
    EllipsisComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EllipsisComponent,
    LoadingIndicatorComponent,
    SpinnerComponent
  ]
})
export class LoadingIndicatorModule {
  static forRoot(): ModuleWithProviders<LoadingIndicatorModule> {
    return {
      ngModule: LoadingIndicatorModule,
      providers: [{provide: LOADING_INDICATOR_CONFIG, useValue: DEFAULT_CONFIG}]
    };
  }
}

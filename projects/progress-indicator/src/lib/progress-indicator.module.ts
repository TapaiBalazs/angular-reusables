import {ModuleWithProviders, NgModule} from '@angular/core';
import {ProgressIndicatorComponent} from './components/progress-indicator.component';
import {OverlayComponent} from './components/overlay/overlay.component';
import {CommonModule} from '@angular/common';
import {IndicatorHostDirective} from './directives/indicator-host.directive';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {DEFAULT_CONFIG, PROGRESS_INDICATOR_CONFIG} from './progress-indicator.config';

@NgModule({
  declarations: [ProgressIndicatorComponent, OverlayComponent, IndicatorHostDirective, ProgressBarComponent],
  imports: [
    CommonModule
  ],
  exports: [ProgressIndicatorComponent],
  entryComponents: [
    ProgressBarComponent
  ]
})
export class ProgressIndicatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProgressIndicatorModule,
      providers: [{provide: PROGRESS_INDICATOR_CONFIG, useValue: DEFAULT_CONFIG}]
    };
  }
}

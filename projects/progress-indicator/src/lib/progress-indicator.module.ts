import {NgModule} from '@angular/core';
import {ProgressIndicatorComponent} from './components/progress-indicator.component';
import {OverlayComponent} from './overlay/overlay.component';
import {CommonModule} from '@angular/common';
import {IndicatorHostDirective} from '../lib/directives/indicator-host.directive';

@NgModule({
  declarations: [ProgressIndicatorComponent, OverlayComponent, IndicatorHostDirective],
  imports: [
    CommonModule
  ],
  exports: [ProgressIndicatorComponent]
})
export class ProgressIndicatorModule {
}

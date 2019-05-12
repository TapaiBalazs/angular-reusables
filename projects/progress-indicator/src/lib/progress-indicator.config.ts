import {ProgressIndicatorConfig} from './interfaces/progress-indicator.interfaces';
import {InjectionToken} from '@angular/core';
import {DEFAULT_SIZE, INDICATOR_COLOR, OVERLAY_BACKGROUND} from './constants/indicator.constants';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';

export const DEFAULT_CONFIG: ProgressIndicatorConfig = {
  size: DEFAULT_SIZE,
  color: INDICATOR_COLOR,
  overlayColor: OVERLAY_BACKGROUND,
  indicatorComponent: ProgressBarComponent
};

export const PROGRESS_INDICATOR_CONFIG: InjectionToken<string> = new InjectionToken('btp-pi-conf');


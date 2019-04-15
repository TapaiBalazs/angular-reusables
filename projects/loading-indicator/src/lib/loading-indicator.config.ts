import {LoadingIndicatorConfig} from './interfaces/loading-indicator.interfaces';
import {InjectionToken} from '@angular/core';
import {SpinnerComponent} from './spinner/spinner.component';
import {DEFAULT_SIZE, INDICATOR_COLOR, OVERLAY_BACKGROUND} from './constants/indicator.constants';

export const DEFAULT_CONFIG: LoadingIndicatorConfig = {
  size: DEFAULT_SIZE,
  color: INDICATOR_COLOR,
  overlayColor: OVERLAY_BACKGROUND,
  indicatorComponent: SpinnerComponent
};

export const LOADING_INDICATOR_CONFIG: InjectionToken<string> = new InjectionToken('btp-li-conf');


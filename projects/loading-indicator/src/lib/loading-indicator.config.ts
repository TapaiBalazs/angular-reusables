import {LoadingIndicatorConfig} from './interfaces/loading-indicator.interfaces';
import {InjectionToken} from '@angular/core';

export const DEFAULT_CONFIG: LoadingIndicatorConfig = {
  size: 160,
  color: '#7B1FA2'
};

export const LOADING_INDICATOR_CONFIG: InjectionToken<string> = new InjectionToken('btp-li-conf');


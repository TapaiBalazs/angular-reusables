import { InjectionToken } from '@angular/core';
import { DEFAULT_OVERLAY_CONFIG } from './constants/error-handler.constants';
import { ErrorHandlerConfig } from './interfaces/error-handler.interfaces';

export const DEFAULT_ERROR_HANDLER_CONFIG: ErrorHandlerConfig = {
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
  errorHandlerHooks: [],
};

export const ERROR_HANDLER_CONFIG: InjectionToken<ErrorHandlerConfig> = new InjectionToken('btp-eh-conf');

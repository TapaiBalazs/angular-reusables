import { OverlayConfig } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export const DEFAULT_OVERLAY_CONFIG: OverlayConfig = {
  hasBackdrop: true,
};

export const ERROR_INJECTOR_TOKEN: InjectionToken<any> = new InjectionToken('ErrorInjectorToken');

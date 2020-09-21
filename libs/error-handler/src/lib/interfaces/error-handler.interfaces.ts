import { OverlayConfig } from '@angular/cdk/overlay';

export interface ErrorHandlerConfig {
  overlayConfig?: OverlayConfig;
  errorHandlerHooks?: Array<(error: any) => void>;
}

export interface SanitizedError {
  message: string;
  details: string[];
}

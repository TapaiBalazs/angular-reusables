import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {ErrorHandlerComponent} from './components/error-handler.component';
import {FullscreenOverlayContainer, OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {ErrorHandlerService} from './error-handler.service';
import {A11yModule} from '@angular/cdk/a11y';
import {DEFAULT_ERROR_HANDLER_CONFIG, ERROR_HANDLER_CONFIG} from './error-handler.config';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ErrorHandlerComponent],
  imports: [CommonModule, OverlayModule, A11yModule],
  entryComponents: [ErrorHandlerComponent]
})
export class ErrorHandlerModule {

  public static forRoot(): ModuleWithProviders<ErrorHandlerModule> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
        {provide: ERROR_HANDLER_CONFIG, useValue: DEFAULT_ERROR_HANDLER_CONFIG}
      ]
    };
  }
}

import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {ErrorHandlerComponent} from './components/error-handler.component';
import {FullscreenOverlayContainer, OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {ErrorHandlerService} from './error-handler.service';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  declarations: [ErrorHandlerComponent],
  imports: [OverlayModule, A11yModule],
  providers: [],
  entryComponents: [ErrorHandlerComponent]
})
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: OverlayContainer, useClass: FullscreenOverlayContainer}]
    };
  }
}

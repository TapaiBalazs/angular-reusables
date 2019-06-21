import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorHandlerComponent} from './components/error-handler.component';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay} from '@angular/cdk/overlay';
import {DEFAULT_OVERLAY_CONFIG} from './constants/error-handler.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private overlay: Overlay;

  constructor(private injector: Injector) {
    this.overlay = this.injector.get(Overlay);
  }

  handleError(error: any): void {
    const overlayRef = this.overlay.create(DEFAULT_OVERLAY_CONFIG);
    const ErrorHandlerPortal = new ComponentPortal(ErrorHandlerComponent);
    const compRef = overlayRef.attach(ErrorHandlerPortal);
    compRef.instance.error = error;
    compRef.instance.dismiss$.subscribe(() => {
      overlayRef.dispose();
    });
  }
}

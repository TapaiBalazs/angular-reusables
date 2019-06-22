import {ComponentRef, ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorHandlerComponent} from './components/error-handler.component';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {DEFAULT_OVERLAY_CONFIG, ERROR_INJECTOR_TOKEN} from './constants/error-handler.constants';
import {ERROR_HANDLER_CONFIG} from './error-handler.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private overlay: Overlay;

  constructor(private injector: Injector) {
    this.overlay = this.injector.get(Overlay);
  }

  handleError(error: any): void {
    // TODO: sanitize error
    const {overlayConfig, errorHandlerHooks} = this.injector.get(ERROR_HANDLER_CONFIG);

    (errorHandlerHooks || []).forEach((hook) => hook(error));
    const overlayRef = this.createOverlayReference(overlayConfig);
    this.attachPortal(overlayRef, error).subscribe(() => {
      overlayRef.dispose();
    });
  }

  private createOverlayReference(overlayConfig: OverlayConfig): OverlayRef {
    const overlaySettings: OverlayConfig = {...DEFAULT_OVERLAY_CONFIG, ...overlayConfig};
    return this.overlay.create(overlaySettings);
  }

  private attachPortal(overlayRef: OverlayRef, error: any): Observable<{}> {
    const ErrorHandlerPortal: ComponentPortal<ErrorHandlerComponent> = new ComponentPortal(
      ErrorHandlerComponent,
      null,
      this.createInjector(error)
    );
    const compRef: ComponentRef<ErrorHandlerComponent> = overlayRef.attach(ErrorHandlerPortal);
    return compRef.instance.dismiss$;
  }

  private createInjector(error: any): PortalInjector {
    const injectorTokens = new WeakMap<any, any>([
      [ERROR_INJECTOR_TOKEN, error]
    ]);

    return new PortalInjector(this.injector, injectorTokens);
  }
}

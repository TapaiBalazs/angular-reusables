import {Directive, ElementRef, EmbeddedViewRef, Inject, Input, OnDestroy, Optional, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthorisationInterface} from './authorisation.interface';
import {Subscription} from 'rxjs';
import {AbstractControl} from '@angular/forms';
import {AUTHORISATION_CLASS, AUTHORISATION_HANDLER} from './auth-tokens';

export interface AuthorisationContext {
  $implicit: (b: boolean) => boolean;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[authorisation]'
})
export class AuthorisationDirective<T extends AuthorisationInterface> implements OnDestroy {
  private userSub: Subscription;
  private role: string;
  private viewRef: EmbeddedViewRef<AuthorisationContext> = null;
  private formControl: AbstractControl = null;

  constructor(@Inject(AUTHORISATION_HANDLER) private authService: AuthorisationInterface,
              @Inject(ElementRef) private el: ElementRef,
              @Inject(ViewContainerRef) private viewContainer: ViewContainerRef,
              @Inject(TemplateRef) private templateRef: TemplateRef<AuthorisationContext>,
              @Inject(AUTHORISATION_CLASS) @Optional() private authClass: string) {
    this.userSub = this.authService.onUserChange$.subscribe(this.updateView.bind(this));
  }

  @Input()
  set authorisation(role: string) {
    this.role = role;
    this.updateView();
  }

  @Input()
  set control(ctrl: AbstractControl) {
    this.formControl = ctrl;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  private updateView(): void {
    const hasReadRight = this.authService.hasReadAccess(this.role);
    if (hasReadRight) {
      const hasWriteRight = this.authService.hasWriteAccess(this.role);
      this.viewContainer.clear();
      this.viewRef = this.viewContainer.createEmbeddedView(
        this.templateRef,
        this.createContext(hasWriteRight)
      );
      if (!hasWriteRight) {
        this.formControl?.disable();
        this.setUnauthorised();
      }
    } else {
      this.viewContainer.clear();
      this.viewRef = null;
    }
  }

  private createContext(hasWriteRight: boolean): AuthorisationContext {
    return {
      $implicit: (booleanValue: boolean) => !hasWriteRight || booleanValue,
    };
  }

  private setUnauthorised(): void {
    const boundElement = this.el.nativeElement.previousSibling;
    if (boundElement?.classList && this.authClass) {
      boundElement.classList.add(this.authClass);
    }
  }
}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
// import {LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';
// import {LoadingIndicatorConfig} from '../interfaces/loading-indicator.interfaces';
import {progressState$} from '../progress-indicator.decorators';
import {pluck} from 'rxjs/operators';


@Component({
  selector: 'btp-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit, OnDestroy {
  @ViewChild('focusTrap')
  focusTrap: ElementRef;
  private isLoadingSub: Subscription;
  private previousFocusTarget: HTMLElement;
  private nextFocusTarget: HTMLElement;

  constructor(/*@Inject(LOADING_INDICATOR_CONFIG) private config: LoadingIndicatorConfig*/) {
  }

  get isVisible$(): Observable<boolean> {
    return progressState$.pipe(pluck('isVisible$'));
  }

  get overlayColor(): string {
    return 'white';
  }

  ngOnInit(): void {
    this.isLoadingSub = this.isVisible$
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.trapFocus();
        } else {
          this.restoreFocus();
        }
      });
  }

  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }

  disableKeyboardEvents(event: FocusEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.nextFocusTarget.focus();
  }

  private trapFocus(): void {
    this.previousFocusTarget = document.activeElement as HTMLElement;
    if (this.previousFocusTarget) {
      this.previousFocusTarget.blur();
    }
    this.nextFocusTarget = this.focusTrap.nativeElement;
    this.nextFocusTarget.focus();
  }

  private restoreFocus(): void {
    if (this.previousFocusTarget) {
      this.nextFocusTarget = this.previousFocusTarget;
      this.nextFocusTarget.focus();
    }
  }
}

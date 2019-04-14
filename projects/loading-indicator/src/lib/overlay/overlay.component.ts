import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {isLoading$} from '../loading-indicator.decorators';

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

  get isLoading$(): Observable<boolean> {
    return isLoading$;
  }

  ngOnInit(): void {
    this.isLoadingSub = this.isLoading$
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

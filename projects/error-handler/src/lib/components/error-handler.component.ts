import {AfterViewInit, Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'btp-error-handler',
  template: `
    <section cdkTrapFocus [cdkTrapFocusAutoCapture]="true" class="btp-error-handler__container">
      <h2>Error</h2>
      <p>{{error.message}}</p>
      <div class="btp-error-handler__scrollable">
        <span>{{error.stack}}</span>
      </div>
      <button class="btp-error-handler__dismiss" (click)="dismiss()">DISMISS</button>
    </section>`,
  styleUrls: ['./error-handler.component.css'],
})
export class ErrorHandlerComponent implements AfterViewInit {
  private isVisible = new Subject();
  dismiss$: Observable<{}> = this.isVisible.asObservable();
  error: Error = {} as Error;

  constructor() {
  }

  ngAfterViewInit(): void {

  }

  dismiss() {
    this.isVisible.next();
  }

}



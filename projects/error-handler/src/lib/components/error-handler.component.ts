import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ERROR_INJECTOR_TOKEN} from '../constants/error-handler.constants';
import {SanitizedError} from '../interfaces/error-handler.interfaces';

@Component({
  selector: 'btp-error-handler',
  template: `
    <section cdkTrapFocus [cdkTrapFocusAutoCapture]="true" class="btp-error-handler__container">
      <h2>Error</h2>
      <p>{{error.message}}</p>
      <div class="btp-error-handler__scrollable">
        <ng-container *ngFor="let detail of error.details">
          <div>{{detail}}</div>
        </ng-container>
      </div>
      <button class="btp-error-handler__dismiss button red" (click)="dismiss()">DISMISS</button>
    </section>`,
  styleUrls: ['./error-handler.component.css'],
})
export class ErrorHandlerComponent implements OnInit {
  private isVisible = new Subject();
  dismiss$: Observable<{}> = this.isVisible.asObservable();

  constructor(@Inject(ERROR_INJECTOR_TOKEN) public error: SanitizedError,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.ref.detectChanges();
  }

  dismiss() {
    this.isVisible.next();
    this.isVisible.complete();
  }

}



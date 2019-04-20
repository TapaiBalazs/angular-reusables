import {Component} from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from 'loading-indicator';

@Component({
  selector: 'app-loading-indicator-showcase',
  template: `
    <section>
      <h1>Loading Indicator Showcase </h1>
      <button data-test-id="cy-trigger-indicator" (click)="triggerLoadingIndicator()">START LOADING</button>
    </section>
    <router-outlet></router-outlet>
  `,
  styles: [`
  :host {
    display: flex;
    flex: 1 1 auto;
    flex-flow: column wrap;
  }
  `]
})
export class LoadingIndicatorShowcaseComponent {
  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 100);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}

import { Component } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-loading-indicator-showcase',
  templateUrl: './loading-indicator-showcase.component.html',
  styleUrls: ['./loading-indicator-showcase.component.css']
})
export class LoadingIndicatorShowcaseComponent {

  readonly control = new FormControl(1000)
  readonly control1 = new FormControl(1000)

  multiTrigger = [10000, 5000];

  @startLoadingIndicator()
  triggerLoadingIndicator(customValue?: number): void {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), customValue || this.control.value);
  }

  addToMultiTrigger(value: string) {
    this.multiTrigger.push(parseInt(value, 10));
  }

  triggerMultipleLoadingIndicators(): void {
    this.multiTrigger.forEach((timeout) => {
      this.triggerLoadingIndicator(timeout);
    })
  }

  clearMultiTrigger(): void {
    this.multiTrigger = [];
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop(): void {
    console.log('stopped');
  }
}

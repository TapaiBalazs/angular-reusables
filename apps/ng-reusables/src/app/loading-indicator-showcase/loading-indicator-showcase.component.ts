import { Component } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from '@nx-reusables/loading-indicator';

@Component({
  selector: 'app-loading-indicator-showcase',
  templateUrl: './loading-indicator-showcase.component.html',
  styleUrls: ['./loading-indicator-showcase.component.css']
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

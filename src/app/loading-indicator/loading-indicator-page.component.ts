import { Component } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator-page.component.html',
  styleUrls: ['./loading-indicator-page.component.css']
})
export class LoadingIndicatorPageComponent {
  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 100);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}

import { Component } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from 'loading-indicator';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-ellipsis-page.component.html',
  styleUrls: ['./loading-ellipsis-page.component.css']
})
export class LoadingEllipsisPageComponent {
  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 100);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}

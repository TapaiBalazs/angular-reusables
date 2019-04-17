import { Component } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from 'loading-indicator';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-message-page.component.html',
  styleUrls: ['./loading-message-page.component.css']
})
export class LoadingMessagePageComponent {
  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 100);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}

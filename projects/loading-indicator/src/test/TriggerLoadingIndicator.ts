import {startLoadingIndicator, stopLoadingIndicator} from '../lib/loading-indicator.decorators';

export class TriggerLoadingIndicator {
  @startLoadingIndicator
  start(): void {
  }

  @stopLoadingIndicator
  stop(): void {
  }
}

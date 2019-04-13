import {Component, Inject} from '@angular/core';
import {LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';
import {LoadingIndicatorConfig} from '../interfaces/loading-indicator.interfaces';

@Component({
  selector: 'btp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  constructor(@Inject(LOADING_INDICATOR_CONFIG)
              private config: LoadingIndicatorConfig) {
  }

  get borderColor(): string {
    return `${this.config.color} transparent transparent transparent`;
  }

  get borderWidth(): string {
    return `${this.config.size / 8}px`;
  }
}

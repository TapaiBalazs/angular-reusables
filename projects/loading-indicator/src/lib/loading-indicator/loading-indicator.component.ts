import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {isLoading$} from '../loading-indicator.decorators';
import {LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';
import {LoadingIndicatorConfig} from '../interfaces/loading-indicator.interfaces';

@Component({
  selector: 'lib-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent {

  constructor(@Inject(LOADING_INDICATOR_CONFIG)
              private config: LoadingIndicatorConfig) {
  }

  get isLoading$(): Observable<boolean> {
    return isLoading$;
  }

  get indicatorSize(): string {
    return `${this.config.size}px`;
  }
}

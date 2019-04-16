import {SpinnerComponent} from '../spinner/spinner.component';
import {EllipsisComponent} from '../ellipsis/ellipsis.component';

export interface LoadingIndicatorConfig {
  size: number;
  color: string;
  overlayColor?: string;
  indicatorComponent?: SpinnerComponent | EllipsisComponent | any;
}

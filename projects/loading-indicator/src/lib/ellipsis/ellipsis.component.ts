import {Component} from '@angular/core';
import {DEFAULT_SIZE, INDICATOR_COLOR} from '../constants/indicator.constants';

@Component({
  selector: 'btp-ellipsis',
  templateUrl: './ellipsis.component.html',
  styleUrls: ['./ellipsis.component.css']
})
export class EllipsisComponent {
  public color = INDICATOR_COLOR;
  public size = DEFAULT_SIZE;

  get indicatorColor(): string {
    return this.color;
  }

  get indicatorSize(): string {
    return `${this.size}px`;
  }
}

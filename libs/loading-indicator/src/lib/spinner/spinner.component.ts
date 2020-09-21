import { Component } from '@angular/core';
import { DEFAULT_SIZE, INDICATOR_COLOR } from '../constants/indicator.constants';

@Component({
  selector: 'btp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  color = INDICATOR_COLOR;
  size = DEFAULT_SIZE;

  get borderColor(): string {
    return `${this.color} transparent transparent transparent`;
  }

  get borderWidth(): string {
    return `${this.size / 8}px`;
  }
}

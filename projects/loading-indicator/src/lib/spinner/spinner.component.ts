import {Component} from '@angular/core';

@Component({
  selector: 'btp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  color: '#7B1FA2';
  size: 160;

  constructor() {
  }

  get borderColor(): string {
    return `${this.color} transparent transparent transparent`;
  }

  get borderWidth(): string {
    return `${this.size / 8}px`;
  }
}

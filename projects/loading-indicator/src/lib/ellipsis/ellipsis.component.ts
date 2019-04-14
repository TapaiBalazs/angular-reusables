import {Component} from '@angular/core';

@Component({
  selector: 'btp-ellipsis',
  templateUrl: './ellipsis.component.html',
  styleUrls: ['./ellipsis.component.css']
})
export class EllipsisComponent {
  color: '#7B1FA2';
  size: 160;

  constructor() {
  }

  get indicatorColor(): string {
    return this.color;
  }

  get indicatorSize(): string {
    return `${this.size}px`;
  }

  get ellipsisSize(): string {
    return `${this.size / 10}px`;
  }
}

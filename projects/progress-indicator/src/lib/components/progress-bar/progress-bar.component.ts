import {Component} from '@angular/core';

@Component({
  selector: 'btp-progress-indicator',
  template: `
    <div class="btp-progress-bar__wrapper">
      <div class="btp-progress-bar__meter"></div>
    </div>
  `,
  styles: [`
    .btp-progress-bar__wrapper {
      background-color: black;
      border-radius: 13px;
      /* (height of inner div) / 2 + padding */
      padding: 3px;
    }

    .btp-progress-bar__wrapper > .btp-progress-bar__meter {
      background-color: orange;
      width: 40%;
      /* Adjust with JavaScript */
      height: 20px;
      border-radius: 10px;
    }
  `]
})
export class ProgressBarComponent {

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'btp-progress-indicator',
  template: `
    <btp-overlay>
      <div class="btp-progress-indicator__container">
        <ng-template btpIndicatorHost></ng-template>
      </div>
    </btp-overlay>
  `,
  styles: []
})
export class ProgressIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

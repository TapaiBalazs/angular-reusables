import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      :host {
        display: flex;
        flex: 1 1 100vh;
      }
    `,
  ],
})
export class AppComponent {
}

# LoadingIndicator

## How to install

Install the package with the following script:

```npm install @btapai/ng-loading-indicator```

or

```yarn add @btapai/ng-loading-indicator```

## How to use

Import the module into your main ngModule
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoadingIndicatorModule} from '@btapai/ng-loading-indicator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoadingIndicatorModule // place it into the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Add the loading-indicator component to your app.component template
```angular2html
<!-- add the component to the bottom of the file -->
<lib-loading-indicator></lib-loading-indicator>
```

Use the method decorators to start/stop the indicator.

```typescript
import {Component} from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from '@btapai/ng-loading-indicator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 5000);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}

```

The loading indicator should appear.


## Further plans

I'd like to add the possibility for users of this library to be able to trigger their own loading-indicator component, or at least to be able to style the provided one.
I'd also like to add the possibility to use a deterministic loading-indicator, with custom text and progress bar.

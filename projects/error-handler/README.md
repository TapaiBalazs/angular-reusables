# ErrorHandler

## How to install

Install the package with the following script:

```npm install @btapai/ng-error-handler```

or

```yarn add @btapai/ng-error-handler```

## How to use

Import the module into your main ngModule
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ErrorHandlerModule} from '@btapai/ng-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ErrorHandlerModule.forRoot() // place it into the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

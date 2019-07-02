# ErrorHandler

## How to install and use

1. Install the package with the following script:

    ```bash
    npm install @btapai/ng-error-handler --save
    ```

2. This package has @angular/cdk as a peer dependency. Install it as well:

    ```bash
    npm install @angular/cdk --save
    ```

3. If your project does not use @angular/material, add the following line into your styles.css file:

    ```css
    @import '~@angular/cdk/overlay-prebuilt.css';
    ```
4. Import the module into your main ngModule

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

With this setup uncaught errors will be handled by this error-handler module.

## Customisation

This packages uses the Angular CDK Overlay module for creating a backdrop. If you would like to style the overlay, provide a configuration object with your custom OverlayConfig object. For possible config options check out its [documentation](https://material.angular.io/cdk/overlay/overview)

  ```typescript
  import {BrowserModule} from '@angular/platform-browser';
  import {NgModule} from '@angular/core';
  import {AppComponent} from './app.component';
  import {ErrorHandlerModule, ERROR_HANDLER_CONFIG, ErrorHandlerConfig} from '@btapai/ng-error-handler';
  
  const CustomErrorHandlerConfig: ErrorHandlerConfig = {
    overlayConfig: {
      hasBackdrop: false // 
    }
  };
  
  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      ErrorHandlerModule.forRoot() 
    ],
    providers: [
     { provide: ERROR_HANDLER_CONFIG, useValue: CustomErrorHandlerConfig }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {
  }
  ```
  
You can also provide custom hooks to run when an error is thrown:

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ErrorHandlerModule, ERROR_HANDLER_CONFIG, ErrorHandlerConfig} from '@btapai/ng-error-handler';
import {ThirdPartyErrorLogger} from 'third-party-error-logger';
  
const CustomErrorHandlerConfig: ErrorHandlerConfig = {
  errorHandlerHooks: [
    ThirdPartyErrorLogger.logErrorMessage,
  ]
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ErrorHandlerModule.forRoot(),
  ],
  providers: [
    {provide: ERROR_HANDLER_CONFIG, useValue: CustomErrorHandlerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

---

## Future plans

I'd like to keep this module up-to date with Angular versions.

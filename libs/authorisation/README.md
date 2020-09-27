# Authorisation

## How to install

Install the package with the following script:

`npm install @btapai/ng-authorisation`

or

`yarn add @btapai/ng-authorisation`

## How to use

Import the module into your main ngModule and in lazy-loaded modules where you would like to use the directive.
Inside your main ngModule, provide the `AUTHORISATION_HANDLER` injection token and use your service, which implements the
`AuthorisationInterface` interface. If you'd like to use the extra styling functionality, you can provide the `AUTHORISATION_CLASS`
injection token and use your own "unauthorised" css class name.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthorisationModule, AUTHORISATION_HANDLER, AUTHORISATION_CLASS } from '@btapai/ng-authorisation';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthorisationModule],
  providers: [
    { provide: AUTHORISATION_HANDLER, useClass: YourAuthorisationService },
    { provide: AUTHORISATION_CLASS, useValue: 'your-specific-class' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Add the authorisation structural directive to your template using the asterisk (\*) syntax, to prevent displaying components if the user
does not have `READ` access.

```angular2html
<div *authorisation="'BIG_RED_BUTTON'">
  The div won't be part of the DOM if the user does not have READ access.
</div>
```

If you would like to disable a button, or a template-driven form input, you can use the directive's `WRITE` access checker method.

```angular2html
<div *authorisation="'BIG_RED_BUTTON'; let hasOnlyReadAccess">
  The "hasOnlyReadAccess" method will return the provided boolean if the user has write access,
  otherwise, the button is disabled.
  <button [disabled]="hasOnlyReadAccess(isDisabled)">BIG RED BUTTON</button>
</div>
```

You can also disable reactive form controls, groups and arrays as well, passing the formControl as the control parameter

```angular2html
<div *authorisation="'BIG_RED_BUTTON'; control: formControl">
  <div>
    <label for="simpleControl">Simple FormControl bound using [formControl]</label>
    <input id="simpleControl" [formControl]="formControl" />
  </div>
</div>
<form *authorisation="'LAUNCH_CODE_INPUTS'; control: launchCodesForm" [formGroup]="launchCodesForm">
  <label for="primary-high-ranking-officer">First officer access code:</label>
  <input id="primary-high-ranking-officer" formControlName="firstOfficerAccessCode" />

  <label for="secondary-high-ranking-officer">Second officer access code:</label>
  <input id="secondary-high-ranking-officer" formControlName="secondOfficerAccessCode" />
</form>

```

---

This authorisation directive might not be sufficient to your authorisation handling needs, but feel free to copy the code and make the
necessary changes for yourself. Please, if you do so, throw me a tweet [@TapaiBalazs](https://twitter.com/TapaiBalazs)

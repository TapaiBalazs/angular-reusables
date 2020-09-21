import { Component } from '@angular/core';
import { TestBed, TestBedStatic, waitForAsync } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { AUTHORISATION_CLASS, AUTHORISATION_HANDLER } from './auth-tokens';
import { AuthorisationDirective } from './authorisation.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  template: '',
})
class TestComponent {}

const HAS_ALL_RIGHTS_HANDLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => true,
  hasWriteAccess: () => true,
};

const HAS_ONLY_READ_RIGHTS_HANDLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => true,
  hasWriteAccess: () => false,
};

const HAS_NO_RIGHTS_HANLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => false,
  hasWriteAccess: () => false,
};

describe('AuthorisationDirective', () => {
  let testingModule: TestBedStatic;

  beforeEach(
    waitForAsync(() => {
      testingModule = TestBed.configureTestingModule({
        declarations: [TestComponent, AuthorisationDirective],
        providers: [
          {
            provide: AUTHORISATION_HANDLER,
            useValue: HAS_ALL_RIGHTS_HANDLER,
          },
          {
            provide: AUTHORISATION_CLASS,
            useValue: 'unauthorised',
          },
        ],
      });
    })
  );

  it('Should apply the ng-reflect value after the div node it is attached to', () => {
    testingModule.overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`).compileComponents();
    const fixture = testingModule.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}--><div>TEST</div>`);
  });

  it('Should display nothing, but the binding comment if the user does not have any rights', () => {
    testingModule
      .overrideProvider(AUTHORISATION_HANDLER, { useValue: HAS_NO_RIGHTS_HANLER })
      .overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`)
      .compileComponents();
    const fixture = testingModule.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}-->`);
  });

  it('Should applies the unauthorised css class to the component if the user does not have write rights', () => {
    testingModule
      .overrideProvider(AUTHORISATION_HANDLER, { useValue: HAS_ONLY_READ_RIGHTS_HANDLER })
      .overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`)
      .compileComponents();
    const fixture = testingModule.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}--><div class="unauthorised">TEST</div>`);
  });

  it('Should put the bindings comment after the element if it is on an ng-container', () => {
    testingModule
      .overrideProvider(AUTHORISATION_HANDLER, { useValue: HAS_ONLY_READ_RIGHTS_HANDLER })
      .overrideTemplate(TestComponent, `<ng-container *authorisation="'TEST'"><div>TEST</div></ng-container>`)
      .compileComponents();
    const fixture = testingModule.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}--><!----><div>TEST</div>`);
  });

  it('Should apply the ng-reflect value after the p node it is attached to', () => {
    testingModule.overrideTemplate(TestComponent, `<p *authorisation="'TEST'">TEST</p>`).compileComponents();
    const fixture = testingModule.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}--><p>TEST</p>`);
  });
});

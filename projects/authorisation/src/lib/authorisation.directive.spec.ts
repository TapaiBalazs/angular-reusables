import {AuthorisationDirective} from './authorisation.directive';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {AUTHORISATION_CLASS, AUTHORISATION_HANDLER} from './auth-tokens';
import {NEVER} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  template: ''
})
class TestComponent {
}

const HAS_ALL_RIGHTS_HANDLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => true,
  hasWriteAccess: () => true
};

const HAS_ONLY_READ_RIGHTS_HANDLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => true,
  hasWriteAccess: () => false
};

const HAS_NO_RIGHTS_HANLER = {
  onUserChange$: NEVER,
  hasReadAccess: () => false,
  hasWriteAccess: () => false
}

describe('AuthorisationDirective', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorisationDirective, TestComponent],
      providers: [
        {
          provide: AUTHORISATION_HANDLER,
          useValue: HAS_ALL_RIGHTS_HANDLER
        },
        {
          provide: AUTHORISATION_CLASS,
          useValue: 'unauthorised'
        }
      ]
    }).compileComponents();
  });

  it('Should apply the ng-reflect value after the div node it is attached to', () => {
    const fixture = TestBed.overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`)
      .createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<div>TEST</div><!--bindings={
  "ng-reflect-authorisation": "TEST"
}-->`);
  });

  it('Should display nothing if the user does not have any rights', () => {
    const fixture = TestBed
      .overrideProvider(AUTHORISATION_HANDLER, { useValue: HAS_NO_RIGHTS_HANLER})
      .overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`)
      .createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<!--bindings={
  "ng-reflect-authorisation": "TEST"
}-->`);
  });

  it('Should applies the unauthorised css class to the component if the user does not have write rights', () => {
    const fixture = TestBed
      .overrideProvider(AUTHORISATION_HANDLER, { useValue: HAS_ONLY_READ_RIGHTS_HANDLER})
      .overrideTemplate(TestComponent, `<div *authorisation="'TEST'">TEST</div>`)
      .createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<div class="unauthorised">TEST</div><!--bindings={
  "ng-reflect-authorisation": "TEST"
}-->`);
  });

  it('Should apply the ng-reflect value after the p node it is attached to', () => {
    const fixture = TestBed.overrideTemplate(TestComponent, `<p *authorisation="'TEST'">TEST</p>`)
      .createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual(`<p>TEST</p><!--bindings={
  "ng-reflect-authorisation": "TEST"
}-->`);
  });

});


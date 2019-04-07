import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoadingIndicatorComponent} from './loading-indicator.component';
import {skip, take} from 'rxjs/operators';
import {TriggerLoadingIndicator} from '../../test/TriggerLoadingIndicator';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {DEFAULT_CONFIG, LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;
  let trigger: TriggerLoadingIndicator;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingIndicatorComponent],
      providers: [{provide: LOADING_INDICATOR_CONFIG, useValue: DEFAULT_CONFIG}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    trigger = new TriggerLoadingIndicator();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    trigger.stop();
  });

  it(`should not be visible when it is not loading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(
      take(1)
    ).subscribe((isLoading) => {
      expect(isLoading).toBe(false);
    });
  }));

  it(`should be visible when it is loading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(
      skip(1),
      take(1)
    ).subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
    trigger.start();
  }));

  it(`should not be visible when it is started then stoppedloading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(
      skip(3),
      take(1)
    ).subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
    trigger.start();
    trigger.stop();
  }));
});

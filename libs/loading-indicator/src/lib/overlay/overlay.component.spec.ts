import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { TriggerLoadingIndicator } from '../../test/TriggerLoadingIndicator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import {DEFAULT_CONFIG, LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';

describe('LoadingIndicatorComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;
  let trigger: TriggerLoadingIndicator;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LOADING_INDICATOR_CONFIG,
          useValue: DEFAULT_CONFIG
        }
      ]
    }).compileComponents();

    trigger = new TriggerLoadingIndicator();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    trigger.stop();
  });

  it(`should not be visible when it is not loading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(take(1)).subscribe((isLoading) => {
      expect(isLoading).toBe(false);
    });
  }));

  it(`should be visible when it is loading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(skip(1), take(1)).subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
    trigger.start();
  }));

  it(`should not be visible when it is started then stoppedloading`, async(() => {
    expect(component).toBeTruthy();
    component.isLoading$.pipe(skip(3), take(1)).subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
    trigger.start();
    trigger.stop();
  }));
});

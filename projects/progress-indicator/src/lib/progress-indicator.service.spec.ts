import { TestBed } from '@angular/core/testing';

import { ProgressIndicatorService } from './progress-indicator.service';

describe('ProgressIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressIndicatorService = TestBed.get(ProgressIndicatorService);
    expect(service).toBeTruthy();
  });
});

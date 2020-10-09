import { TestBed } from '@angular/core/testing';

import { BlockBackNavigationService } from './block-back-navigation.service';

describe('BlockBackNavigationService', () => {
  let service: BlockBackNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockBackNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

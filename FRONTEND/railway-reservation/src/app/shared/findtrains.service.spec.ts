import { TestBed } from '@angular/core/testing';

import { FindtrainsService } from './findtrains.service';

describe('FindtrainsService', () => {
  let service: FindtrainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindtrainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WineQueryService } from './wine-query.service';

describe('WineQueryService', () => {
  let service: WineQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

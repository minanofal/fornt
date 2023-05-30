import { TestBed } from '@angular/core/testing';

import { CatgoriesService } from './catgories.service';

describe('CatgoriesService', () => {
  let service: CatgoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatgoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

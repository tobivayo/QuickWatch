import { TestBed } from '@angular/core/testing';

import { GlobalStoreService } from './global-store.service';

describe('StoreService', () => {
  let service: GlobalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

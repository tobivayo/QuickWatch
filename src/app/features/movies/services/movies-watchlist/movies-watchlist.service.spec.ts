import { TestBed } from '@angular/core/testing';

import { MoviesWatchlistService } from './movies-watchlist.service';

describe('MoviesWatchlistService', () => {
  let service: MoviesWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

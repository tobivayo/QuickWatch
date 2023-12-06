import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesWatchlistService {
  private _watchlistKey = 'watchlist';
  private _localStorageService = inject(LocalStorageService);
  private _snackbar = inject(MatSnackBar);

  private _watchlist = new BehaviorSubject<string[] | null>(null);
  public readonly watchlist$ = this._watchlist.asObservable();

  constructor() {
    this.updateState();
  }

  updateState(): void {
    const watchlist = this._localStorageService.getItem(this._watchlistKey);
    if (!watchlist) return;

    this._watchlist.next(watchlist);
  }

  getCurrentWatchlist(): string[] {
    return this._watchlist.value || [];
  }

  addToWatchlist(movieId: string, name: string): void {
    const watchlist = this._watchlist.value;

    if (!watchlist) {
      this._localStorageService.setItem(this._watchlistKey, [movieId]);
    } else {
      const newWatchlist = [...watchlist, movieId];
      this._localStorageService.setItem(this._watchlistKey, newWatchlist);
    }
    this._snackbar.open(`${name} was added to the Watchlist!`, '' ,{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    })
    this.updateState();
  }


  removeFromWatchlist(movieId: string, name: string): void {
    const watchlist = this._watchlist.value;
    if (!watchlist) return;

    const newWatchlist = watchlist.filter((id) => id !== movieId);
    this._localStorageService.setItem(this._watchlistKey, newWatchlist);

    this._snackbar.open(`${name} was removed from the Watchlist!`, '' ,{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start',
    })
    this.updateState();
  }
}

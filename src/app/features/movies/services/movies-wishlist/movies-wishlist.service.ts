import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesWishlistService {
  private _wishlistKey = 'wishlist';
  private _localStorageService = inject(LocalStorageService);
  private _snackbar = inject(MatSnackBar);

  private _wishlist = new BehaviorSubject<string[] | null>(null);
  public readonly wishlist$ = this._wishlist.asObservable();

  constructor() {
    this.updateState();
  }

  updateState(): void {
    const wishlist = this._localStorageService.getItem(this._wishlistKey);
    if (!wishlist) return;

    this._wishlist.next(wishlist);
  }

  getCurrentWishlist(): string[] {
    return this._wishlist.value || [];
  }

  addToWishlist(movieId: string, name: string): void {
    const wishlist = this._wishlist.value;

    if (!wishlist) {
      this._localStorageService.setItem(this._wishlistKey, [movieId]);
    } else {
      const newWishlist = [...wishlist, movieId];
      this._localStorageService.setItem(this._wishlistKey, newWishlist);
    }
    this._snackbar.open(`${name} was added to the Wishlist!`, '' ,{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    })
    this.updateState();
  }


  removeFromWishlist(movieId: string, name: string): void {
    const wishlist = this._wishlist.value;
    if (!wishlist) return;

    const newWishlist = wishlist.filter((id) => id !== movieId);
    this._localStorageService.setItem(this._wishlistKey, newWishlist);

    this._snackbar.open(`${name} was removed from the Wishlist!`, '' ,{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start',
    })
    this.updateState();
  }
}

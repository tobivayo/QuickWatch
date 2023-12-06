import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { MoviesWishlistService } from '../../services/movies-wishlist/movies-wishlist.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class MovieCardComponent implements OnInit, OnDestroy {
  private _moviesWishlistService = inject(MoviesWishlistService);
  @Input() movie: Movie | null = null;

  isFavorite: boolean = false;
  wishlistSub: Subscription | null = null;

  ngOnInit(): void {
    this.wishlistSub = this._moviesWishlistService.wishlist$.subscribe( (wishlist) => {
      if (!wishlist) return;
      this.isFavorite = wishlist.includes(this.movie!.id);
    })
  }

  ngOnDestroy(): void {
    this.wishlistSub?.unsubscribe();
  }

  addToWishlist(event: MouseEvent): void {
    event.stopPropagation();

    this.isFavorite
      ? this._moviesWishlistService.removeFromWishlist(this.movie!.id)
      : this._moviesWishlistService.addToWishlist(this.movie!.id);
  }

  get img(): string {
    return `../../../../../assets/${this.movie?.imgUrl}`;
  }
}

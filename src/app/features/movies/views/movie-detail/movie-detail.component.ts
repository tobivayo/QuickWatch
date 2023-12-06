import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { MoviesWishlistService } from '../../services/movies-wishlist/movies-wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  private _activatedRoute = inject(ActivatedRoute);
  private _moviesApiService = inject(MoviesApiService);
  private _wishlistService = inject(MoviesWishlistService);
  private _wishlistSub: Subscription | null = null;

  id: string = this._activatedRoute.snapshot.params['id'];
  movie: Movie | null = null;
  imgHeight: number = 0;
  isFavorite: boolean = false;

  get imgSrc(): string {
    return `../../../../../assets/${this.movie?.imgUrl}`;
  }

  ngOnInit(): void {
    this._moviesApiService.getMovieById(this.id).subscribe( movie => {
      this.movie = movie;
      this._checkForFavorite();
    });
  }

  ngOnDestroy(): void {
    if (this._wishlistSub) {
      this._wishlistSub.unsubscribe();
    }
  }

  onFavoriteClick(): void {
    this.isFavorite
      ? this._wishlistService.removeFromWishlist(this.movie!.id, this.movie!.title)
      : this._wishlistService.addToWishlist(this.movie!.id, this.movie!.title);
  }

  private _checkForFavorite() {
    this._wishlistSub = this._wishlistService.wishlist$.subscribe( (wishlist) => {
      if (!wishlist) return;
      this.isFavorite = wishlist.includes(this.movie!.id);
    });
  }
}

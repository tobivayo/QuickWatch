import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { MoviesWatchlistService } from '../../services/movies-watchlist/movies-watchlist.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  private _watchlistService = inject(MoviesWatchlistService);
  private _sanitizer = inject(DomSanitizer);
  private _watchlistSub: Subscription | null = null;

  id: string = this._activatedRoute.snapshot.params['id'];
  movie: Movie | null = null;
  imgHeight: number = 0;
  isFavorite: boolean = false;

  get imgSrc(): string {
    return `../../../../../assets/${this.movie?.imgUrl}`;
  }

  get urlSrc(): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.movie?.trailerUrl || '');
  }

  ngOnInit(): void {
    this._moviesApiService.getMovieById(this.id).subscribe( movie => {
      this.movie = movie;
      this._checkForFavorite();
    });
  }

  ngOnDestroy(): void {
    if (this._watchlistSub) {
      this._watchlistSub.unsubscribe();
    }
  }

  onFavoriteClick(): void {
    this.isFavorite
      ? this._watchlistService.removeFromWatchlist(this.movie!.id, this.movie!.title)
      : this._watchlistService.addToWatchlist(this.movie!.id, this.movie!.title);
  }

  private _checkForFavorite() {
    this._watchlistSub = this._watchlistService.watchlist$.subscribe( (watchlist) => {
      if (!watchlist) return;
      this.isFavorite = watchlist.includes(this.movie!.id);
    });
  }
}

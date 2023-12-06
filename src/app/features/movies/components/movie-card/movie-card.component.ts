import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { MoviesWatchlistService } from '../../services/movies-watchlist/movies-watchlist.service';
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
  private _moviesWatchlistService = inject(MoviesWatchlistService);
  @Input() movie: Movie | null = null;

  isFavorite: boolean = false;
  watchlistSub: Subscription | null = null;

  ngOnInit(): void {
    this.watchlistSub = this._moviesWatchlistService.watchlist$.subscribe( (watchlist) => {
      if (!watchlist) return;
      this.isFavorite = watchlist.includes(this.movie!.id);
    })
  }

  ngOnDestroy(): void {
    this.watchlistSub?.unsubscribe();
  }

  addToWatchlist(event: MouseEvent): void {
    event.stopPropagation();

    this.isFavorite
      ? this._moviesWatchlistService.removeFromWatchlist(this.movie!.id, this.movie!.title)
      : this._moviesWatchlistService.addToWatchlist(this.movie!.id, this.movie!.title);
  }

  get img(): string {
    return `../../../../../assets/${this.movie?.imgUrl}`;
  }

  get ratingPercentage(): string {
    const percentage = ((this.movie?.rating || 0) / 10) * 100;
    return `${percentage}%`;
  }
}

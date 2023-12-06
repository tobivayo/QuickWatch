import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { MoviesListComponent } from '../../container/movies-list/movies-list.component';
import { MoviesWatchlistService } from '../../services/movies-watchlist/movies-watchlist.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MoviesListComponent, RouterModule]
})
export class WatchlistComponent implements OnInit, OnDestroy{
  moviesApi = inject(MoviesApiService);
  watchlistService = inject(MoviesWatchlistService);

  watchlistSub: Subscription | null = null;
  watchlist: Movie[] = [];

  ngOnInit(): void {
    this.moviesApi.getWatchlistMovies().subscribe({
      next: (movies) => {
        this.watchlist = movies;
      }
    });
    this.watchlistSub = this.watchlistService.watchlist$.subscribe((ids) => {
      this.watchlist = this.watchlist.filter(m => ids?.includes(m.id));
    })
  }

  ngOnDestroy(): void {
    if (this.watchlistSub) {
      this.watchlistSub.unsubscribe();
    }
  }
}

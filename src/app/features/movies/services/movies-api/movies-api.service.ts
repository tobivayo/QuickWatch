import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import movies from '../../../../../assets/data.json';
import { MoviesWatchlistService } from '../movies-watchlist/movies-watchlist.service';

interface MoviesRepository {
  getMovies(): Observable<Movie[]>;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService implements MoviesRepository{
  private _watchlistService = inject(MoviesWatchlistService);
  constructor() {}

  public getMovies(): Observable<Movie[]> {
    return of(movies).pipe(map((movies) => this._moviesAdapter(movies)))
  }

  public getWatchlistMovies(): Observable<Movie[]> {
    return of(movies).pipe(map((movies) => {
      const watchlistIds = this._watchlistService.getCurrentWatchlist();
      const watchlist = this._moviesAdapter(movies).filter((m) => watchlistIds.includes(m.id));
      return watchlist
    }));
  }

  public getMovieById(id: string): Observable<Movie> {
    const movie = movies.find(movie => movie.id === id);

    return of(this._movieAdapter(movie));
  }

  private _moviesAdapter(movies: any[]): Movie[] {
    return movies.map((movie) => this._movieAdapter(movie));
  }

  private _movieAdapter(movie: any): Movie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      rating: movie.rating,
      duration: movie.duration,
      genre: movie.genre,
      releaseDate: new Date(movie.releaseDate),
      trailerUrl: movie.trailerUrl,
      imgUrl: movie.imgUrl
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { MoviesListComponent } from '../../container/movies-list/movies-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, MoviesListComponent]
})
export class HomeComponent implements OnInit {
  moviesApi = inject(MoviesApiService);
  movies: Movie[] = [];
  activeSort = 'date';

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe((movies) => {
      this.movies = movies
      this.sortByDate();
    });
  }

  sortByName(): void {
    this.movies.sort((a, b) => a.title.localeCompare(b.title));
    this.activeSort = 'name';
  }

  sortByDate(): void {
    this.movies.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime() );
    this.activeSort = 'date';
  }

  sortByRating(): void {
    this.movies.sort((a, b) => b.rating - a.rating);
    this.activeSort = 'rating';
  }
}

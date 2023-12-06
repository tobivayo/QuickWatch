import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from 'src/app/core/interfaces/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieCardComponent]
})
export class MoviesListComponent {
  @Input() movies: Movie[] = [];
}

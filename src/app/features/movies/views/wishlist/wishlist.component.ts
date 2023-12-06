import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { MoviesListComponent } from '../../container/movies-list/movies-list.component';
import { MoviesWishlistService } from '../../services/movies-wishlist/movies-wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MoviesListComponent]
})
export class WishlistComponent implements OnInit, OnDestroy{
  moviesApi = inject(MoviesApiService);
  wishlistService = inject(MoviesWishlistService);

  wishlistSub: Subscription | null = null;
  wishlist: Movie[] = [];

  ngOnInit(): void {
    this.moviesApi.getWishlistMovies().subscribe({
      next: (movies) => {
        this.wishlist = movies;
      }
    });
    this.wishlistSub = this.wishlistService.wishlist$.subscribe((ids) => {
      this.wishlist = this.wishlist.filter(m => ids?.includes(m.id));
    })
  }

  ngOnDestroy(): void {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }
}

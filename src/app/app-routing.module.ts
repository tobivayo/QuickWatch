import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/movies/views/home/home.component';
import { MovieDetailComponent } from './features/movies/views/movie-detail/movie-detail.component';
import { WishlistComponent } from './features/movies/views/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

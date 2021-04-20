import { Component, OnInit } from '@angular/core';
import { Movie } from '../core';
import * as movieService from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MovieComponent implements OnInit {
  errorMessage: string;
  showAdd = false;
  movies: Movie[];

  async ngOnInit() {
    await this.getMovies();
  }

  async getMovies() {
    this.errorMessage = undefined;
    try {
      this.movies = await movieService.getMovies();
    } catch (error) {
      this.errorMessage = error?.error?.message || 'Error occurred';
    }
  }

  trackByMovie(index: number, movie: Movie): number {
    return movie.id;
  }
}

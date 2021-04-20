import { Component } from '@angular/core';
import { Movie } from './core';
import * as movieService from './movie.service';

@Component({
  selector: 'app-movie',
  template: `
    <div class="container columns">
      <div *ngIf="movies" class="column is-8">
        <app-list-header
          title="My Movies"
          (refresh)="getMovies()"
          [showAdd]="showAdd"
        ></app-list-header>
        <div *ngIf="errorMessage">{{ errorMessage }}</div>
        <div *ngIf="!movies?.length && !errorMessage">Loading data ...</div>
        <ul class="list">
          <li
            role="presentation"
            *ngFor="let movie of movies; trackBy: trackByMovie; let i = index"
          >
            <div class="card">
              <div class="card-content">
                <div class="content movie-grid">
                  <label>Name:</label><span>{{ movie.name }}</span>
                  <label>Year:</label><span>{{ movie.year }}</span>
                  <label>Length:</label><span>{{ movie.length }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class MovieComponent {
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

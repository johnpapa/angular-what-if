import { Component } from '@angular/core';
import * as busyService from './core';
import { delay, observeOn } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header-bar></app-header-bar>
      <div class="section columns">
        <app-nav class="column is-2"></app-nav>
        <main class="column">
          <div [hidden]="!busy">
            <progress class="progress is-medium is-info" max="100">
              45%
            </progress>
          </div>
          <div [hidden]="busy">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AppComponent {
  busy = false;

  constructor() {
    busyService.busyState$
      // asapScheduler ensures this is async; remove this and look in console to see nasty error without this
      // ExpressionChangedAfterItHasBeenCheckedError
      .pipe(observeOn(asapScheduler))
      .subscribe((bs) => (this.busy = bs.isBusy));
  }
}

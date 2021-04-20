import { Component } from '@angular/core';
import * as busyService from './core';
import { delay, observeOn } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';
import { Router } from '@angular/router';
import { getRouter } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  busy = false;

  constructor(router: Router) {
    getRouter(router);
    busyService.busyState$
      // asapScheduler ensures this is async; remove this and look in console to see nasty error without this
      // ExpressionChangedAfterItHasBeenCheckedError
      .pipe(observeOn(asapScheduler))
      .subscribe((bs) => (this.busy = bs.isBusy));
  }
}

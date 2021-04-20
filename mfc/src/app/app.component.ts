import { Component } from '@angular/core';
import * as busyService from './core';
import { delay, observeOn } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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

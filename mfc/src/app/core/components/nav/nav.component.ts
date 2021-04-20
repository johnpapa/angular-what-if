import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as sessionService from '../../session.service';

const captains = console;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy {
  private subs = new Subscription();
  message: string;
  loggedIn: boolean;

  constructor(private router: Router) {
    this.subs.add(
      sessionService.sessionState$.subscribe(async (state) => {
        this.message = state.message;
        this.loggedIn = state.loggedIn;
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  signout() {
    sessionService.logout();
    captains.info(`Successfully logged out`);
    const url = ['/home'];
    this.router.navigate(url);
  }
}

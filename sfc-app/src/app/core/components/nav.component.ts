import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as sessionService from '../session.service';

const captains = console;

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/home" routerLinkActive="router-link-active">
          <span>Home</span>
        </a>
        <a routerLink="/movies" routerLinkActive="router-link-active">
          <span>My Movies</span>
        </a>
        <a routerLink="/heroes" routerLinkActive="router-link-active">
          <span>Heroes</span>
        </a>
        <a routerLink="/villains" routerLinkActive="router-link-active">
          <span>Villains</span>
        </a>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <a
          *ngIf="!loggedIn"
          routerLink="/signin"
          routerLinkActive="router-link-active"
        >
          <span>Sign in</span>
        </a>
        <a *ngIf="loggedIn" (click)="signout()">
          <span>Sign Out</span>
        </a>
      </div>
    </nav>
    <div class="user">
      <p>{{ message }}</p>
    </div>
  `,
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

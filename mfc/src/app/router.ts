import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MovieComponent } from './movies.component';
import { NotFoundComponent, SignInComponent } from './core';
import { AuthFailedComponent } from './core/components/auth-failed.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: 'villains',
    loadChildren: () =>
      import('./villains/villains.module').then((m) => m.VillainsModule),
  },
  { path: 'signin', component: SignInComponent },
  { path: 'authfailed', component: AuthFailedComponent },
  { path: '**', component: NotFoundComponent },
];

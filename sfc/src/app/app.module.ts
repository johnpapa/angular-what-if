import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { setRouter } from './core';

import { routes } from './router';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { applyHttpInterceptors, declarations } from './core';
import { MovieComponent } from './movies.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MovieComponent, declarations],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    setRouter(router);
    applyHttpInterceptors();
  }
}

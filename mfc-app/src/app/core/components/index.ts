export * from './auth-failed/auth-failed.component';
export * from './header-bar/header-bar.component';
export * from './header-bar-brand/header-bar-brand.component';
export * from './nav/nav.component';
export * from './not-found/not-found.component';
export * from './sign-in/sign-in.component';

import { AuthFailedComponent } from './auth-failed/auth-failed.component';
import { HeaderBarBrandComponent } from './header-bar-brand/header-bar-brand.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const declarations = [
  AuthFailedComponent,
  HeaderBarComponent,
  HeaderBarBrandComponent,
  NavComponent,
  NotFoundComponent,
  SignInComponent,
];

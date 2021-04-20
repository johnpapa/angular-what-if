import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as sessionService from '../../session.service';

const captains = console;

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email = 'john@contoso.com';
  password = '1234';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async signin() {
    await sessionService.signin(this.email, this.password);
    const redirectTo = this.route.snapshot.queryParams['redirectTo'];
    //     map((qp) => qp['redirectTo']),
    //   )
    //   .subscribe((redirectTo) => {
    if (sessionService.isLoggedIn) {
      captains.info(`Successfully logged in`);
      const url = redirectTo ? [redirectTo] : ['/home'];
      this.router.navigate(url);
    }
  }

  cancel() {
    const url = ['/home'];
    this.router.navigate(url);
  }
}

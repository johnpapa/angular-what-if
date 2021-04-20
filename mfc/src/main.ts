import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { appInjector } from './app/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref: { injector: Injector }) => appInjector(ref.injector))
  // .then(() => appInjector())
  .catch((err) => console.error(err));

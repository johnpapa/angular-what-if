import { Injector } from '@angular/core';

let appInjectorRef: Injector;

export function appInjector(injector?: Injector): Injector {
  if (!appInjectorRef) {
    if (!injector) {
      injector = Injector.create({ providers: [] });
    }
    appInjectorRef = injector;
  }
  return appInjectorRef;
}

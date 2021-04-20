import { Router } from '@angular/router';

let freeRouter: Router;

export const getRouter = (router?: Router) => {
  if (router) {
    freeRouter = router;
  }
  return freeRouter;
};

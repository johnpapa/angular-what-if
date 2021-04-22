import { Router } from '@angular/router';

export let freeRouter: Router;

export const setRouter = (router?: Router) => {
  freeRouter = router;
  return freeRouter;
};

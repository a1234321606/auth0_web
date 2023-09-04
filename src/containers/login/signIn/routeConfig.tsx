import { lazy } from 'react';

interface IRoute {
  path: string
  auth: boolean
  Component: React.FC
}

export const signInRoute: IRoute = {
  path: '/sign-in',
  auth: false,
  Component: lazy(() => import('./index')),
};

export default {
  signInRoute,
};

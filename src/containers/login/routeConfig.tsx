import { lazy } from 'react';

interface IRoute {
  path: string
  auth: boolean
  Component: React.FC
}

export const loginRoute: IRoute = {
  path: '/',
  auth: false,
  Component: lazy(() => import('./index')),
};

export default {
  loginRoute,
};
export { emailVerifierRnoute } from './emailVerification/routeConfig';
export { signInRoute } from './signIn/routeConfig';

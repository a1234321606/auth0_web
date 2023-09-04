import { lazy } from 'react';

interface IRoute {
  path: string,
  auth: boolean,
  Component: React.FC
}

export const profileRoute: IRoute = {
  path: '/profile',
  auth: true,
  Component: lazy(() => import('./index')),
};

export default undefined;

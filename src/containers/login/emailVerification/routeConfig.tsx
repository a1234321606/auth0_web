import { lazy } from 'react';

interface IRoute {
  path: string
  auth: boolean
  Component: React.FC
}

export const emailVerifierRnoute: IRoute = {
  path: '/email-verification',
  auth: true,
  Component: lazy(() => import('./index')),
};

export default {
  emailVerifierRnoute,
};

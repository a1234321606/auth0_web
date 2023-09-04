import React, { lazy } from 'react';
import { FormattedMessage } from 'react-intl';

interface IRoute {
  path: string
  auth: boolean
  Component: React.FC
}

interface IMenu {
  key: number
  path: string
  label: string | JSX.Element
  children: IMenu[]
}

export const userRoute: IRoute = {
  path: '/user',
  auth: true,
  Component: lazy(() => import('./index')),
};

export const userMenu: IMenu = {
  key: 100,
  path: '/user',
  label: <FormattedMessage id="menu_user" />,
  children: [],
};

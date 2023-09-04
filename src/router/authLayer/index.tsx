import React from 'react';
import Auth0 from './auth0';
import Acl from './acl';

interface IProps {
  children: JSX.Element
}

export default ({ children }: IProps) => <Auth0><Acl>{children}</Acl></Auth0>;

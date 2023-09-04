import React, { useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, authActions } from 'src/redux/store';
import axios from 'src/utilities/axios';

interface IProps {
  children: JSX.Element
}

const Auth0 = ({ children }: IProps) => {
  const auth0 = useAuth0();
  const dispatch = useAppDispatch();

  const getToken = async () => {
    const accessToken = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${process.env.REACT_APP_LOGIN_DOMAIN}/api/v2/`,
      },
    });
    dispatch(authActions.setToken(accessToken));
    axios.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  useEffect(() => {
    if (!auth0.isLoading) {
      dispatch(authActions.setAuth0(auth0));
      dispatch(authActions.setIsAuth(auth0.isAuthenticated));
      if (auth0.isAuthenticated) {
        const name = auth0.user?.['https://custom.claim/name'];
        dispatch(authActions.setUsername(name || auth0.user?.name));
        if (!auth0.user?.email_verified) dispatch(authActions.setUnverifiedEmail(auth0.user?.email || ''));
        getToken();
      }
    }
  }, [auth0.isLoading]);

  return children;
};

export default ({ children }: IProps) => (
  <Auth0Provider
    domain={process.env.REACT_APP_LOGIN_DOMAIN || ''}
    clientId={process.env.REACT_APP_LOGIN_CLIENT_ID || ''}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: `https://${process.env.REACT_APP_LOGIN_DOMAIN}/api/v2/`,
      scope: 'profile email read:current_user update:current_user_metadata',
    }}
  >
    <Auth0>{children}</Auth0>
  </Auth0Provider>
);

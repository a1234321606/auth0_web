import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useIntl } from 'react-intl';
import { Container, LoginPanel, Footer } from './components';

export default () => {
  const { loginWithRedirect } = useAuth0();
  const { formatMessage } = useIntl();

  useEffect(() => {
  }, []);

  return (
    <Container>
      <LoginPanel>
        <h1 style={{ margin: '0 0 20px' }}>{formatMessage({ id: 'welcome' })}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant="contained" onClick={() => loginWithRedirect()}>{formatMessage({ id: 'login' })}</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => loginWithRedirect({
              authorizationParams: {
                screen_hint: 'signup',
              },
            })}
          >
            {formatMessage({ id: 'sign_up' })}
          </Button>
        </div>
      </LoginPanel>
      <Footer>{formatMessage({ id: 'copyright' })}</Footer>
    </Container>
  );
};

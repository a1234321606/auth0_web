import React, { Suspense, useLayoutEffect } from 'react';
import {
  Routes, Route, Outlet, useNavigate,
} from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAppSelector } from 'src/redux/store';
import { routeConfig, menuConfig } from './routeConfig';
import { Header } from './components';
import Ops from './components/ops';

interface IRoute {
  path: string
  auth: boolean
  Component: React.FC
}

const AppLayout: React.FC<any> = () => {
  const { pathname } = window.location;
  const { isAuth, unverifiedEmail, auth0 } = useAppSelector((state) => state.authReducer);
  const Login: React.FC = routeConfig.find((rc) => rc.path === '/')?.Component || Ops;
  const OpsRoute: IRoute = { path: '/ops', auth: false, Component: Ops };
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let route = routeConfig.find((rc) => rc.path === pathname);
    if (!route || (isAuth && pathname === '/')) {
      route = routeConfig.find((rc) => rc.auth === isAuth) || OpsRoute;
      navigate(route.path);
    } else if (isAuth) {
      if (!unverifiedEmail) {
        if (pathname === '/email-verification') {
          route = routeConfig.find((rc) => rc.auth === isAuth) || OpsRoute;
          navigate(route.path);
        }
      } else navigate('/email-verification');
    } else if (route.auth) auth0.loginWithRedirect({ appState: { returnTo: route.path } });
  }, [pathname, isAuth, unverifiedEmail]);
  return (
    <div
      className="main"
      style={{
        background: '#e8eceb',
        minWidth: 'fit-content',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {pathname === '/' ? <Login /> : (
        <>
          <Header menuConfig={menuConfig} />
          <Outlet />
        </>
      )}
    </div>
  );
};
const App: React.FC<any> = () => {
  const { formatMessage } = useIntl();

  return (
    <Suspense fallback={<h2>{formatMessage({ id: 'loading_msg' })}</h2>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {routeConfig.map(({ path, Component }: any) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Ops />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default App;

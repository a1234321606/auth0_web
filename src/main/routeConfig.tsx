import { loginRoute, emailVerifierRnoute } from 'src/containers/login/routeConfig';
import { userRoute, userMenu } from 'src/containers/user/routeConfig';
import { profileRoute } from './profile/routeConfig';

export const routeConfig = [loginRoute, userRoute, profileRoute, emailVerifierRnoute];

export const menuConfig = [userMenu];

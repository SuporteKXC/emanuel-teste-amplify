import type { RouterProps } from 'contracts/Router';
import { LoginPage } from 'pages/Guest';
import { Navigate, RouteObject } from 'react-router-dom';

const loginRoute = ({ isLoggedIn, location }: RouterProps): RouteObject => ({
  path: 'login',
  element: !isLoggedIn ? (
    <LoginPage />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
});

export default loginRoute;

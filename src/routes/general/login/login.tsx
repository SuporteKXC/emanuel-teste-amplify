import type { RouterProps } from "contracts";
import { LoginPage } from 'pages';
import { Navigate, RouteObject } from 'react-router-dom';
import { forgotMyPasswordRoute, passwordResetRoute } from 'routes';

export const loginRoute = ({ isLoggedIn, location }: RouterProps): RouteObject[] => ([
  {
    path: '/',
    element: !isLoggedIn ? (
      <LoginPage />
    ) : (
      <Navigate to="/"/>
    ),
  },
  forgotMyPasswordRoute({}),
  passwordResetRoute({}),
  {
    path: "*",
    element: <Navigate to="/" state={{ from: location }}/>
  }
]);
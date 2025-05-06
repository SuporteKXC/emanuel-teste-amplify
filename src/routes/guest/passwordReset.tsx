import type { RouterProps } from 'contracts/Router';
import { PasswordResetPage } from 'pages/Guest';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const forgotMyPasswordRoute = ({
  isLoggedIn,
  location,
}: RouterProps): RouteObject => ({
  path: 'redefinir-senha',
  element: !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: ':email/:token',
      element: <PasswordResetPage />,
    },
    {
      path: ':email',
      element: <PasswordResetPage />,
    },
  ],
});

export default forgotMyPasswordRoute;

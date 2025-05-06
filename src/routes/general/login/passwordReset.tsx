import type { RouterProps } from "contracts";
import { PasswordResetPage } from 'pages';
import { Outlet, RouteObject } from 'react-router-dom';

export const passwordResetRoute = ({}: Partial<RouterProps>): RouteObject => ({
  path: 'redefinir-senha',
  element: <Outlet />,
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
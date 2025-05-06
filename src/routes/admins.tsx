import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import {
  AdminCreationPage,
  AdminsListPage,
  AdminUpdatePage,
} from 'pages/Admins';

const adminsRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: 'configuracoes/administradores',
  element: userBelongsToAnyOf('admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <AdminsListPage />,
    },
    {
      path: 'criar',
      element: <AdminCreationPage />,
    },
    {
      path: ':id/editar',
      element: <AdminUpdatePage />,
    },
  ],
});

export default adminsRoutes;

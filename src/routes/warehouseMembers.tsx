import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import {
  WarehouseMembersListPage,
  WarehouseMemberCreationPage,
  WarehouseMemberUpdatePage,
} from 'pages/WarehouseMembers';

const warehouseMemberRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: 'configuracoes/armazens/usuarios',
  element: userBelongsToAnyOf('admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <WarehouseMembersListPage />,
    },
    {
      path: 'criar',
      element: <WarehouseMemberCreationPage />,
    },
    {
      path: ':id/editar',
      element: <WarehouseMemberUpdatePage />,
    },
  ],
});

export default warehouseMemberRoutes;

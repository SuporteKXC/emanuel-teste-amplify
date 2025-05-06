import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import {
  WarehousesListPage,
  WarehouseCreationPage,
  WarehouseUpdatePage,
} from 'pages/Warehouses';

const warehousesRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: 'configuracoes/armazens',
  element: userBelongsToAnyOf('admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <WarehousesListPage />,
    },
    {
      path: 'criar',
      element: <WarehouseCreationPage />,
    },
    {
      path: ':id/editar',
      element: <WarehouseUpdatePage />,
    },
  ],
});

export default warehousesRoutes;

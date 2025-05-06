import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import { StockOrdersListPage, StockOrderCreationPage } from 'pages/StockOrders';

const stockOrdersRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: '/solicitacoes-estoque',
  element: userBelongsToAnyOf('admin', 'companyMember', 'warehouseMember') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <StockOrdersListPage />,
    },
    {
      path: 'criar',
      element: <StockOrderCreationPage />,
    },
  ],
});

export default stockOrdersRoutes;

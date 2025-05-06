import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import { StocksListPage } from 'pages/Stocks';

const stocksRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: '',
  element: userBelongsToAnyOf('admin', 'companyMember', 'warehouseMember') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <StocksListPage />,
    },
  ],
});

export default stocksRoutes;

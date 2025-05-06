import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import { DashboardPanel } from 'pages/Dashboard';

const dashboardRoutes = ({
  location,
  userBelongsToAnyOf,
  profile,
}: RouterProps): RouteObject => ({
  path: '/dashboard',
  element: userBelongsToAnyOf('admin', 'companyMember', 'warehouseMember') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <DashboardPanel profile={profile}/>,
    },
  ],
});

export default dashboardRoutes;

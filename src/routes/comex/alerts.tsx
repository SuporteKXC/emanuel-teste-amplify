import type { RouterProps } from "contracts";
import { ListAlerts } from 'pages/Comex';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';

export const alertsRoutes = ({location}: RouterProps): RouteObject => ({
    path: 'alertas',
    element: <PrivateRoute Element={Outlet} action="LISTUSERALERT"/>,
    children: [
      {
        path: '',
        element: <Navigate to="/alerts/comex" state={{ from: location }}/>,
      },
    ],
  }
);
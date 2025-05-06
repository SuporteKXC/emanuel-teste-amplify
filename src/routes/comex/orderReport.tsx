import OrderReports from "@/pages/Comex/OrderReports";
import type { RouterProps } from "contracts";
import {Panels} from 'pages/Comex';
import { Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';

export const orderReportRoutes = ({}: RouterProps): RouteObject => ({
    path: 'order-reports',
    element: <PrivateRoute Element={Outlet} action="LISTPRODUCT"/>,
    children: [
      {
        path: '',
        element: <OrderReports />,
      }
    ],
  });
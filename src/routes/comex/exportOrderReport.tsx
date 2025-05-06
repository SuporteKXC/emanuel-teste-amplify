// import OrderReports from "@/pages/Comex/OrderReports";
import ExportOrderReports from "@/pages/ComexExport/ExportOrderReports";
import type { RouterProps } from "contracts";
import {Panels} from 'pages/Comex';
import { Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';

export const exportOrderReportRoutes = ({}: RouterProps): RouteObject => ({
    path: 'export-order-reports',
    element: <PrivateRoute Element={Outlet} action="LISTEXPORTORDERITEM"/>,
    children: [
      {
        path: '',
        element: <ExportOrderReports />,
      }
    ],
  });
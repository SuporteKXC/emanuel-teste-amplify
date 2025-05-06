import type { RouterProps } from "contracts";
import {Panels} from 'pages/Comex';
import { ShowOrderItem } from 'pages/Comex';
import { Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';

export const panelsRoutes = ({}: RouterProps): RouteObject => ({
    path: 'panels',
    element: <PrivateRoute Element={Outlet} action="LISTPRODUCT"/>,
    children: [
      {
        path: '',
        element: <Panels/>,
      },
      {
        path: 'order-item/:orderItemId',
        element: <ShowOrderItem />,
      },
    ],
  });
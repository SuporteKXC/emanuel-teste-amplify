import type { RouterProps } from "contracts";
import { Operational, ShowOrderItem } from 'pages/Comex';
import { Outlet, RouteObject } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';

export const operationalRoutes = (props: RouterProps): RouteObject => ({
    path: 'operacional',
    element: <PrivateRoute Element={Outlet} action={["LISTORDERITEM", "LISTRESPONSIBLE"]}/>,
    children: [
      {
        path: '',
        element: <Operational/>,
      },
      {
        path: 'order-item/:orderItemId',
        element: <ShowOrderItem />,
      },
    ],
  });